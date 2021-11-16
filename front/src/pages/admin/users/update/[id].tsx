import { getUser, updateUser } from 'api/admin/user';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IUser } from 'model/IUser';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';


export default function UserUpdate() {

  const router = useRouter();

  const { id } = router.query;
  const token = localStorage.getItem('token');
  
  const [user, setUser] = useState<IUser>({});

  async function handleUpdateUser() {
    const response = await updateUser(user, token);
    response.status === 201 && router.push('/admin/users/list')
  }

  async function handleGetUser() {
    const response: ApiResponse<IUser> = await getUser(id.toString(), token);

    response.entity && setUser(response.entity)
  }

  useEffect(() => {
    id && token && handleGetUser();
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
            value={user.name ?? ''}
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
            value={user.email ?? ''}
            onChange={email => setUser({ ...user, email: email.target.value })}
          />
        </div>

        <button className="btn btn-secondary" type="button" onClick={handleUpdateUser}>SALVAR</button>
      </form>
    </LayoutAdmin>
  );
}