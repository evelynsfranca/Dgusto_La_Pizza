import Head from 'next/head';
import { useEffect, useState } from 'react';



export default function Home() {

  const [token, setToken] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([{
    id: "",
    name: "",
    email: ""
  }]);

  async function req() {
    
    const res = await fetch('http://localhost:8080/login', {
    method: "POST",  
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: "admin", password: "admin"
      })
    })
    .then(res => res)
    .then(data => data)
    .catch(e => console.warn(e));

  const x = await res;

    if(x) {
      setToken(x.headers.get("Authorization"))
    }
  }

  async function showUsersRequest() {

    const data = await fetch('http://localhost:8080/api/admin/users', {
      method: "GET",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
      })
      .then(res => res.json())
      .then(data => data)
      .catch(e => console.warn(e));
  
      if(data) {
        setUsers(data.content);
        setShowUsers(true)
        console.log(data.content)
      }
  
  }

  useEffect(() => req(), [])
  
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

      {showUsers && users && (
        <div style={{ display: 'flex', flexDirection: 'column' }} >    
          {users.map((user, i) => {
            return <div className="grid" style={{ display: 'flex', flexDirection: 'column' }} key={i}>
              <a>{user.name}</a><br/>
              <a>{user.email}</a><br/>
            </div>
          })}      
        </div>
      )}

        <button onClick={showUsersRequest}/>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
