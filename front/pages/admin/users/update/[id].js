import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import logo from '/public/images/logo.png';
import { API_URL } from '../../../../utils/constants';


export default function UserUpdate() {

  const router =  useRouter();

  const { id } = router.query;

  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    id,
    name: '',
    description: '',
    value: 0,
    stockQuantity: '',
    userType: ''
    
  });

  async function handleUpdateUser() {
    const res = await fetch(`${API_URL}/admin/users`, {
    method: "PUT",  
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(user) 
    })
    .then(res => res.json())
    .catch(e => console.warn(e));

    const response = await res;

    if(response) {
      router.push('/admin/users/list')
    }
  }
  
  async function handleGetUser() {
    const res = await fetch(`http://3.130.86.83:8080/api/admin/users/${id}`, {
    method: "GET",  
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
    })
    .then(res => res.json())
    .catch(e => console.warn(e));

    const response = await res;

    if(response) {
      setUser(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }    
  }, []);

  useEffect(() => {
    if(id && token) {
      handleGetUser();
    }
  }, [id, token]);

  return (
    <div className="container">
      <Head>
        <title>UserUpdate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="card">
          <Link href="/">
            <a className="logo">
              <Image src={logo} width={150} height={120} />
            </a>
          </Link>

          <h1 className="title">ApiUserUpdate</h1>


          <p className="form">
            <label>
              Nome
              <input 
                type="text" 
                value={user.name} 
                onChange={name => setUser({ ...user, name: name.target.value })} 
              />
            </label>
            <label>
              Descrição
              <input 
                type="text" 
                value={user.description} 
                onChange={description => setUser({ ...user, description: description.target.value })} 
              />
            </label>
            <label>
              Valor
              <input 
                type="number" 
                value={user.value} 
                onChange={value => setUser({ ...user, value: value.target.value })} 
              />
            </label>
            <label>
              Quantidade em estoque
              <input 
                type="number" 
                value={user.stockQuantity} 
                onChange={stockQuantity => setUser({ ...user, stockQuantity: stockQuantity.target.value })} 
              />
            </label>
            <label>
              Tipo
              <input 
                type="text" 
                value={user.userType} 
                onChange={userType => setUser({ ...user, userType: userType.target.value })} 
              />
            </label>
            
            <button className="button" onClick={handleUpdateUser}>SALVAR</button>
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