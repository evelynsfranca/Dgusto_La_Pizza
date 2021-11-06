import useSWR from 'swr';
import { useState } from "react";
import { API_LOGIN_URL, API_URL } from '../utils/constants';
import style from './LoginPage.module.css';
import Router, { useRouter } from 'next/router';
import localStorage from 'localStorage';
import LayoutGeneral from '../components/Layout/layoutGeneral';
import Link from 'next/link';

export interface IUser {
  username: string;
  password: string;
}

function LoginPage() {
  const [token, setToken] = useState('');
  const router = useRouter()

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [sendingForm, setSendingForm] = useState<boolean>(false)
  const [isUserNameInvalid, setIsUserNameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);
  const [login, setLogin] = useState<IUser>({
    username: '',
    password: ''
  })

  if (typeof window !== undefined && localStorage.getItem('isAdmin') === 'true') {
    router.push('/admin/login')
  }

  if (typeof window !== undefined && localStorage.getItem('isAdmin') === 'false') {
    router.push('/my-purchases')
  }

  function ApiAccount(): any {
    const fetcher = (url, token) => fetch(url, { headers: { "Authorization": token } })
      .then(res => res.json())
      .catch(e => console.warn(e))

    const { data, error } = useSWR([`${API_URL}/account`, token], fetcher)

    if (error) return <> (failed to load)</>
    if (!data) return <> carregado... </>

    if (data.authorities.includes("ROLE_ADMIN")) {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", 'true');
      router.push('/admin/login')
    } else {
      setIsAdmin(false)
      localStorage.setItem("isAdmin", 'false');
      router.push('/my-purchases')
    }

    return <span className="d-none">{data?.authorities.includes("ROLE_ADMIN")}</span>

  }

  function validateForm(): boolean {
    let returnValue = false;

    if (login.username.length < 3) {

      setIsUserNameInvalid(true);
      returnValue = true;

    } else {

      setIsUserNameInvalid(false);
      setIsPasswordInvalid(false);
      returnValue = false;
    }

    if (login.username.length === 0) {

      setIsUserNameInvalid(true);
      returnValue = true;

    } else {

      setIsUserNameInvalid(false);
      setIsPasswordInvalid(false);
      returnValue = false;
    }

    if (login.password.length < 3) {

      setIsPasswordInvalid(true);
      returnValue = true;

    } else {

      setIsUserNameInvalid(false);
      setIsPasswordInvalid(false);
      returnValue = false;
    }

    if (login.password.length === 0) {

      setIsPasswordInvalid(true);
      returnValue = true;

    } else {

      setIsUserNameInvalid(false);
      setIsPasswordInvalid(false);
      returnValue = false;

    }

    return returnValue;

  }

  async function handleLogin() {
    setSendingForm(true);

    if (validateForm()) {

      setSendingForm(false);

    } else {

      const resLogin = await fetch(`${API_LOGIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      })
        .then(res => {
          if (res.status === 200) {
            let token = res.headers.get("Authorization");
            localStorage.setItem("token", token);
            setToken(token)
          }

          return res
        })
        .catch(e => {
          console.warn(e)
        });

      const responseLogin: any = await resLogin;

      if (responseLogin.ok) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)

        if (responseLogin.status === 401) {
          setErrorMessage("Ops, aconteceu algo de errado, seu usuário ou senha não estão corretos, tente novamente.")
        }

      }

      setSendingForm(false)
    }

  }

  return (
    <LayoutGeneral pageName="LoginPage">
      <section className={style.pizzaContainer}></section>

      <main className="container my-5">

        {!isLoggedIn &&
          <section className={style.formsignin}>

            {!!errorMessage &&
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            }

            <form>

              <div className="form-floating mb-1">
                <input
                  type="text"
                  value={login.username}
                  className={[isUserNameInvalid ? " is-invalid " : "", "form-control"].join(" ")}
                  onChange={username => setLogin({ ...login, username: username.target.value })}
                  id="email"
                />
                <label>Usuário</label>

                <div id="validationFeedback" className="invalid-feedback">
                  Campo inválido
                </div>
              </div>

              <div className="form-floating mb-4">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  value={login.password}
                  className={[isPasswordInvalid ? " is-invalid " : "", "form-control"].join(" ")}
                  onChange={password => setLogin({ ...login, password: password.target.value })}
                  id="password"
                />
                <label>Senha</label>

                <div id="validationFeedback" className="invalid-feedback">
                  Campo inválido
                </div>
              </div>

              <button className="w-100 btn btn-lg btn-success" onClick={handleLogin} type="button" disabled={sendingForm} >
                {sendingForm === true &&
                  'Carregando...'
                }

                {sendingForm === false &&
                  'Entrar'
                }
              </button>

              <Link href="/criar-conta">
                <a className="btn btn-link ps-0">
                  Criar Conta
                </a>
              </Link>

            </form>

          </section>
        }

        {isLoggedIn &&
          <>
            carregando...
            <div className="d-none">
              <ApiAccount />
            </div>
          </>
        }

      </main>

    </LayoutGeneral>
  )
}

export default LoginPage;