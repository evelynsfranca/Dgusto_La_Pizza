import Image from 'next/image';
import logo from '/public/images/logo.png';
import Link from 'next/link';

export default function LayoutAdmin({ children }) {
  return (
    <div className="container">
      <main>

        <div className="card">

          <Link href="/admin/products/list">
            <a className="logo">
              <Image src={logo} width={150} height={137} />
            </a>
          </Link>

          {children}
        </div>

      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        .container {
          display: flex;
          justify-content: center;

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
          margin-top: 30px;
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

        input {
          border: 0;
          border-bottom: 1px solid #dadada;
          border-radius: 5px;
          font-size: 1rem;
          outline: 0;
          padding: 10px;
        }

        .button-primary {
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
          margin-bottom: 30px;
        }

        .button-primary:hover {
          background-color: #dd190c;
          opacity: 1;
        }

        .button-secondary {
          background-color: #34b134;
          border: 0;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          outline: 0;
          padding: 10px 15px;
        }

        .button-secondary:hover {
          background-color: #34b134;
          opacity: 0.90;
        }

        .button-tertiary {
          background-color: #5d5dff;
          border: 0;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          outline: 0;
          padding: 10px 15px;
        }

        .button-tertiary:hover {
          background-color: #5d5dff;
          opacity: 0.90;
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

        .btn-back {
          text-decoration:none;
          font-size: 140%;
          line-height: 0;
          padding: 10px;
        }

        table thead {
          font-weight: bold;
        }

        table td {
          padding: 6px 15px;
        }
      `}</style>

    </div>
  )
}