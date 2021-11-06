import localStorage from 'localStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import { API_URL } from 'src/utils/constants';

export interface IUser {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

function CreateAccountPage() {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [sendingForm, setSendingForm] = useState<boolean>(false)

  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isRePasswordInvalid, setIsRePasswordInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);

  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {
      router.push('/')
    }
  }, []);

  function resetStatusForm() {
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);
    setIsRePasswordInvalid(false);
  }

  function createErrorMessage() {
    setErrorMessage("Ops, aconteceu algo de errado, tente preencher os campos corretamente e tente novamente.")
  }

  function validateForm(): boolean {
    let returnValue = false;

    if (user.email.length < 3) {

      setIsEmailInvalid(true);
      returnValue = true;

    } else {
      resetStatusForm()
      returnValue = false;
    }

    if (user.email.length === 0) {

      setIsEmailInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;
    }

    if (user.password.length < 3) {

      setIsPasswordInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;
    }

    if (user.password.length === 0) {

      setIsPasswordInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;

    }

    if (user.name.length < 3) {

      setIsNameInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;
    }

    if (user.name.length === 0) {

      setIsNameInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;

    }

    if (user.rePassword.length < 3) {

      setIsRePasswordInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;
    }

    if (user.rePassword.length === 0) {

      setIsRePasswordInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;

    }

    /*if ( !(user.password != user.rePassword) && !(user.password.length != 0 && user.rePassword.length != 0)) {

      setIsPasswordInvalid(true);
      setIsRePasswordInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;

    }*/

    return returnValue;

  }

  async function handleCreateAccount() {
    setSendingForm(true);

    if (validateForm()) {

      createErrorMessage()
      setSendingForm(false);

    } else {

      const res = await fetch(`${API_URL}/create-account`, {
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
        router.push('/login')
      }

      setSendingForm(false)
    }

  }

  return (
    <LayoutGeneral pageName="CreateAccountPage">

      <main className="container my-5">

        {!!errorMessage &&
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        }

        <form className="form">

          <div className="form-floating mb-3">
            <input
              type="text"
              className={[isNameInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              value={user.name}
              onChange={name => setUser({ ...user, name: name.target.value })}
            />
            <label>
              Nome
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className={[isEmailInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              type="email"
              value={user.email}
              onChange={email => setUser({ ...user, email: email.target.value })}
            />
            <label>
              Email
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className={[isPasswordInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              type="password"
              value={user.password}
              onChange={password => setUser({ ...user, password: password.target.value })}
            />
            <label>
              Senha
            </label>
          </div>

          <div className="form-floating mb-3">
            <input
              className={[isRePasswordInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              type="password"
              value={user.rePassword}
              onChange={rePassword => setUser({ ...user, rePassword: rePassword.target.value })}
            />
            <label>
              Repita sua Senha
            </label>
          </div>

          <button className="btn btn-success" onClick={handleCreateAccount} type="button" disabled={sendingForm} >
            {sendingForm === true &&
              'Carregando...'
            }

            {sendingForm === false &&
              'Criar Conta'
            }
          </button>

        </form>

      </main>

    </LayoutGeneral>
  )
}

export default CreateAccountPage;