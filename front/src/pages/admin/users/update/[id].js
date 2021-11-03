import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { API_URL } from '../../../../utils/constants';
import LayoutAdmin from '../../../../components/Layout/layoutAdmin';


export default function UserUpdate() {

  const router = useRouter();

  const { id } = router.query;

  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    id,
    name: '',
    email: ''
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

    if (response) {
      router.push('/admin/users/list')
    }
  }

  async function handleGetUser() {
    const res = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(res => res.json())
      .catch(e => console.warn(e));

    const response = await res;

    if (response) {
      setUser(response)
    }
  }

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {

      setToken(localStorage.getItem('token'))
    }

    if (id && token) {
      handleGetUser();
    }

  }, [id, token]);

  return (
    <LayoutAdmin>
      <Head>
        <title>Editando usuário</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/users/list">
          <a title="Voltar para listagem de usuario" className="btn-back">
            &#8249;
          </a>
        </Link>
        {' '}
        Editando usuário
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
            type="text"
            className="form-control"
            value={user.email}
            onChange={email => setUser({ ...user, email: email.target.value })}
          />
        </div>

        <button className="btn btn-secondary" onClick={handleUpdateUser}>SALVAR</button>
      </form>
    </LayoutAdmin>
  );
}