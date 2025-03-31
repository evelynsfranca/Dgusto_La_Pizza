import { saveUser } from 'api/admin/user';
import localStorage from 'localStorage';
import { IUser } from 'model/IUser';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';
import { userAuthorities } from 'src/utils/constants';

export default function UserList() {

  const router = useRouter();
  const token = localStorage.getItem('token');
  
  const [user, setUser] = useState<IUser>({});

  async function handleUser() {
    const response = await saveUser(user, token);

    if (response) {
      router.push('/admin/users/list')
    }
  }

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
          <span title="Voltar para listagem de usuario" className="btn-back">
            &#8249;
          </span>
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