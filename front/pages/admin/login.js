import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from 'next/dist/client/router';
import { API_LOGIN_URL } from '../../utils/constants';
import style from './Login.module.css';
import logo from '/public/images/logo.png';

function LoginAdminPage() {

  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [sendingForm, setSendingForm] = useState(false)
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')?.includes("Bearer ")) {
      router.push('/admin/products/list')
    }
  }, []);

  async function handleLogin() {
    setSendingForm(true);

    const res = await fetch(`${API_LOGIN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    })
      .then(res => {
        let token = res.headers.get("Authorization");
        localStorage.setItem("token", token);
        setSendingForm(false);

        return res
      })
      .catch(e => {
        console.warn(e)
        setSendingForm(false);
      });

    const response = await res;

    if (response.status == 200) {
      router.push('/admin/products/list')
    }

  }

  return (
    <div className={style.body}>

      <Head>
        <title>Login</title>
      </Head>

      <main className="text-center">

        <Link href="/">
          <a>
            <Image src={logo} width={150} height={137} />
          </a>
        </Link>

        <section className={style.formsignin}>

          <form>
            <h1 className="h3 mb-3 fw-normal">Login</h1>

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

      </main>

    </div>
  );
}

export default LoginAdminPage;