import useSWR from 'swr';
import { useState } from "react";
import { API_LOGIN_URL, API_URL } from '../utils/constants';
import style from './LoginPage.module.css';
import Router, { useRouter } from 'next/router';
import localStorage from 'localStorage';
import LayoutGeneral from '../components/Layout/layoutGeneral';

export interface IUser {
  username?: string;
  password?: string;
}

function LoginPage() {
  const [token, setToken] = useState('');
  const router = useRouter()

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [sendingForm, setSendingForm] = useState<boolean>(false)
  const [login, setLogin] = useState<IUser>({
    username: '',
    password: ''
  })

  if (typeof window !== undefined && localStorage.getItem(btoa('isAdmin')) === btoa('true')) {
    router.push('/admin/login')
  }

  if (typeof window !== undefined && localStorage.getItem(btoa('isAdmin')) === btoa('false')) {
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
      localStorage.setItem(btoa("isAdmin"), btoa('true'));
    } else {
      setIsAdmin(false)
      localStorage.setItem(btoa("isAdmin"), btoa('false'));
    }

    return data?.authorities ? data.authorities.includes("ROLE_ADMIN") ?
      setTimeout(() => router.push('/admin/login'), 1000) :
      setTimeout(() => router.push('/my-purchases'), 1000) : ''

  }

  async function handleLogin() {
    setSendingForm(true);

    if (!login.username || !login.password) {

      console.log(`login ou senha estão em brancos`)
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
          let token = res.headers.get("Authorization");
          localStorage.setItem("token", token);
          setToken(token)

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

            <form>

              <div className="form-floating mb-1">
                <input
                  type="text"
                  value={login.username}
                  className="form-control"
                  onChange={username => setLogin({ ...login, username: username.target.value })}
                  id="email"
                />

                <label>Email</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type={passwordVisibility ? "text" : "password"}
                  value={login.password}
                  className="form-control"
                  onChange={password => setLogin({ ...login, password: password.target.value })}
                  id="password"
                />
                <label>Senha</label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" onClick={handleLogin} type="button" disabled={sendingForm} >
                {sendingForm === true &&
                  'Carregando...'
                }

                {sendingForm === false &&
                  'Entrar'
                }
              </button>
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