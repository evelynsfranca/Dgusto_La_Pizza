import localStorage from 'localStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import LayoutGeneral from 'src/components/Layout/layoutGeneral';
import { API_URL } from 'src/utils/constants';

export interface IAccount {
  cpf: string;
  user: IUser;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function CreateAccountPage({ cartData }) {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [sendingForm, setSendingForm] = useState<boolean>(false)

  const [isCpfInvalid, setIsCpfInvalid] = useState<boolean>(false);
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isPasswordConfirmInvalid, setIsPasswordConfirmInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(undefined);
  const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);

  const [account, setAccount] = useState<IAccount>({
    cpf: '',
    user: null
  });

  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem('token')) {
      router.push('/')
    }
  }, []);

  function resetStatusForm() {
    setIsCpfInvalid(false);
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);
    setIsPasswordConfirmInvalid(false);
  }

  function clearForm() {
    setAccount({
      cpf: '',
      user: null
    })

    setUser({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })

  }

  function createErrorMessage() {
    setErrorMessage("Ops, aconteceu algo de errado, tente preencher os campos corretamente e tente novamente.")
  }

  function validateForm(): boolean {
    let returnValue = false;

    if (account.cpf.length === 0) {

      setIsCpfInvalid(true);
      returnValue = true;

    } else {
      resetStatusForm()
      returnValue = false;
    }

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

    if (user.passwordConfirm.length < 3) {

      setIsPasswordConfirmInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;
    }

    if (user.passwordConfirm.length === 0) {

      setIsPasswordConfirmInvalid(true);
      returnValue = true;

    } else {

      resetStatusForm()
      returnValue = false;

    }

    /*if ( !(account.password != account.passwordConfirm) && !
    (account.password.length != 0 && account.passwordConfirm.length != 0)) {

      setIsPasswordInvalid(true);
      setIsPasswordConfirmInvalid(true);
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

      account.user = user;

      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(account)
      })
        .then(res => res.json())
        .catch(e => console.warn(e));

      const response = await res;

      if (!!response?.id) {
        setIsAccountCreated(true)
        clearForm()
        //router.push('/login')
      }

      if (response.status != 200) {
        setErrorMessage(response.error)
      }

      setSendingForm(false)
    }

  }

  return (
    <LayoutGeneral pageName="CreateAccountPage" cartData={cartData}>

      <main className="container my-5">

        {!!isAccountCreated &&
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Bem Vindo(a)!</h4>
            <p className="m-0">Agora que você possui uma conta você poderá comprar uma de nossas deliciosas pizzas com mais facilidade!</p>
          </div>
        }

        {!!errorMessage &&
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        }

        <form className="form">

          <div className="form-floating mb-3">
            <input
              type="text"
              className={[isCpfInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              value={account.cpf}
              maxLength={11}
              onChange={cpf => setAccount({ ...account, cpf: cpf.target.value })}
            />
            <label>
              CPF
            </label>
          </div>

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
              className={[isPasswordConfirmInvalid ? " is-invalid " : "", "form-control"].join(" ")}
              type="password"
              value={user.passwordConfirm}
              onChange={passwordConfirm => setUser({ ...user, passwordConfirm: passwordConfirm.target.value })}
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