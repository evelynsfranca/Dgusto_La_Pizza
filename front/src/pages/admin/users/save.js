import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import { API_URL, userAuthorities } from 'src/utils/constants';

export default function UserList() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    authorities: []
  });

  async function handleUser() {
    const res = await fetch(`${API_URL}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      router.push('/admin/users/list')
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }
  }, []);

  const handleAuthority = (event) => {
    if(!user.authorities?.includes(event.target.value)){
      setUser({ ...user, authorities: [...user.authorities, event.target.value ]  })
    } else {
      const arr = user.authorities?.filter((item) => item !== event.target.value);
      setUser({ ...user, authorities: arr  })
    }
  }

  return (
    <LayoutAdmin>
      <Head>
        <title>Adicionar novo usuario</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/users/list">
          <a title="Voltar para listagem de usuario" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Adicionar novo usuario
      </h1>

      <form className="form">

        <div className="mb-3">
          <label>
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            onChange={name => setUser({ ...user, name: name.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>
            Email
          </label>
          <input
            className="form-control"
            type="text"
            value={user.email}
            onChange={email => setUser({ ...user, email: email.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>
            Senha
          </label>
          <input
            className="form-control"
            type="text"
            value={user.password}
            onChange={password => setUser({ ...user, password: password.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>
            Username
          <input
            className="form-control"
            type="text"
            value={user.username}
            onChange={username => setUser({ ...user, username: username.target.value })}
          />
        </label>
        </div>
         <label>
          Permissões
          {
            Object.keys(userAuthorities).map((authority) => (
              <label key={authority}>
                {userAuthorities[authority]}
                
                <input 
                  type="checkbox"
                  value={userAuthorities[authority]}
                  checked={user.authorities?.includes(userAuthorities[authority])}
                  onChange={handleAuthority}      
                />
              </label>              
            ))
          }
        </label>

<button type="button" className="btn btn-secondary" onClick={handleUser}>SALVAR</button>

      </form>

    </LayoutAdmin>
  );
}