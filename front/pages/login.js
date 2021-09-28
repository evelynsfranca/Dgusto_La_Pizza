import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import logo from '/public/images/logo.png';
import pizzaImage from '/public/images/pizza-01.jpg';
import { API_LOGIN_URL } from '../utils/constants';


export default function Login() {

  const router = useRouter();
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  async function handleLogin() {
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
      return res
    })
    .catch(e => console.warn(e));

    const response = await res;

    if(response) {
      router.push('/admin/products/list')
    }

  }

  const [passwordVisibility, setPasswordVisibility] = useState(false)

  return (
    <div className="container">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="img" style={{ width: '50%', boxSizing: 'border-box' }}> 
        <Image src={pizzaImage} layout="fill" objectFit="cover" />
      </div>

      <main>
        <div className="card">
          <Link href="/">
            <a className="logo">
              <Image src={logo} width={150} height={120} />
            </a>
          </Link>

          <h1 className="title">Login</h1>

          <p className="form">
            <label>
              Email
              <input 
                type="text" 
                value={login.username} 
                onChange={username => setLogin({ ...login, username: username.target.value })} 
              />
            </label>
            
            <label>
              Senha
                <input 
                  type={passwordVisibility ? "text" : "password"}
                  value={login.password} 
                  onChange={password => setLogin({ ...login, password: password.target.value })} 
                />

                <span className="icon">
                  <FontAwesomeIcon 
                    icon={passwordVisibility ? faEyeSlash : faEye} 
                    size='5x'
                    onClick={() => setPasswordVisibility(!passwordVisibility)} 
                    className="icon"
                  />
                </span>
            </label>
            <button className="button" onClick={handleLogin}>LOGIN</button>
          </p>

        </div>
      </main>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;

          height: 100vh;
          width: 100vw;
          margin: 0;
          box-sizing: border-box;
        }

        main {
          background-color: #fff;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          height: 100%;
          width: 50%;
          z-index: 1;
        }

        .img::before {
          background-color: rgba(0, 0, 0, 0.6);
          content: "";
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: -80px;
          height: 100%;
          width: 50vw;
        }

        .title {
          margin: 20px 0;
          line-height: 1.15;
          font-size: 2rem;
          text-align: center;
        }

        .form {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
          display: flex;
          flex-direction: column;
          line-height: 1.5;
          font-size: 1.5rem;
          width: 45%;
        }

        label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.75rem;
          margin-bottom: 15px;
          text-align: left;
          position: relative;
        }

        .icon {
          position: absolute;
          top: 50%; 
          right: 5px;
          width: 18px;
        }

        input {
          border: 0;
          border-bottom: 1px solid #dadada;
          border-radius: 5px;
          font-size: 1rem;
          outline: 0;
          padding: 10px;
        }

        button {
          background-color: #d91a0d;
          border: 0;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          margin-top: 30px;
          outline: 0;
          opacity: 0.95;
          padding: 15px 40px;
        }

        button:hover {
          background-color: #dd190c;
          opacity: 1;
        }

        .logo {
          display: block;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>

    </div>
  );
}