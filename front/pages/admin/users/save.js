import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from '../../../components/layout/admin';
import { API_URL } from '../../../utils/constants';


export default function UserList() {

  const router = useRouter();

  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    authorithies: [
      {
        name: ''
      }
    ]

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
          Email
          <input
            type="text"
            value={user.email}
            onChange={email => setUser({ ...user, email: email.target.value })}
          />
        </label>
        <label>
          Senha
          <input
            type="text"
            value={user.password}
            onChange={password => setUser({ ...user, password: password.target.value })}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={user.username}
            onChange={username => setUser({ ...user, username: username.target.value })}
          />
        </label>
        <label>
          Permissões
          <input
            type="text"
            value={user?.authorithies.length ? user?.authorithies[0].name : ''}
            onChange={authority => setUser({ ...user, authorithies: [{ name: authority.target.value }] })}
          />
        </label>

        <button className="button-secondary" onClick={handleUser}>SALVAR</button>
      </p>

    </LayoutAdmin>
  );
}