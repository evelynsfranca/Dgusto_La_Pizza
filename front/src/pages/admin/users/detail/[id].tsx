import { getUser } from 'api/admin/user';
import localStorage from 'localStorage';
import { ApiResponse } from 'model/ApiResponse';
import { IUser } from 'model/IUser';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LayoutAdmin from 'src/components/Layout/layoutAdmin';

export default function UserDetail() {

  const token = localStorage.getItem('token');

  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<IUser>({});
  
  async function handleGetUser(id: string) {
    const response: ApiResponse<IUser> = await getUser(id, token);

    if (response.entity) {
      setUser(response.entity)
    }
  }

  useEffect(() => {
    if (id && token) {
      handleGetUser(id.toString());
    }
  }, [id, token]);


  return (
    <LayoutAdmin>

      <Head>
        <title>Detalhes do usuário</title>
      </Head>

      <h1 className="title">
        <Link href="/admin/users/list">
          <span title="Voltar para listagem de usuario" className="btn-back">
            &#8249;
          </span>
        </Link>
        {' '}
        Detalhes do usuário
      </h1>

      <table className="table my-5 py-5">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user?.id?.toString() ?? ''}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>

    </LayoutAdmin>

  );
}