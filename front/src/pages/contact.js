import style from "./Contact.module.css";
import Image from "next/image";
import localization from "/public/images/localization.png";
import LayoutGeneral from "src/components/Layout/layoutGeneral";
import Link from "next/link";

function ContactPage({ cartData }) {
  return (
    <LayoutGeneral pageName="ContactPage" cartData={cartData}>

      <section className={style.pizzaContainer} />

      <main className="container mb-5 mt--5 mt-5">
        <div className="row">
          <div className="col text-center">
            <Image 
              alt="" 
              src={localization} 
              width={1920} 
              height={500}
              className={style.map}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <div className="card mb-2 shadow-sm">
              <div className="card-body">
                <p>Envie-nos uma mensagem</p>

                <form className="my-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome:
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input type="email" className="form-control" id="email" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Assunto:
                    </label>
                    <input type="text" className="form-control" id="subject" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Menssagem:
                    </label>
                    <textarea className="form-control" id="message"></textarea>
                  </div>

                  <button type="button" className="btn btn-primary">
                    Enviar contato
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-3">

            <div className="card mb-2 shadow-sm">
              <div className="card-body">
                <h3>D’Gusto La Pizza</h3>
                <p>
                  <Link
                    href="https://www.google.com.br/maps/search/Rua+Lorem+Ipsum,+44+Dolor+SitAmet+-+99999-100+Curitiba+-+PR"
                    target="_blank"
                  >
                    <>
                      Rua Lorem Ipsum, 44 <br />
                      Dolor SitAmet – 99999-100 <br />
                      Curitiba - PR
                    </>
                  </Link>
                </p>

                <p>
                  Telefone:{" "}
                  <Link href="tel:(41) 3333-4444">(41) 3333-4444</Link>
                  <br />
                  WhatsApp:{" "}
                  <Link href="tel:(41) 9 9999-8888">(41) 9 9999-8888</Link>
                </p>

                <p>
                  Email: <br />{" "}
                  <Link href="mailto:contato@dgustolapizza.com.br">
                    contato@dgustolapizza.com.br
                  </Link>
                </p>

                <p className="d-flex">
                  <Link href="#" className="pe-3">Facebook</Link>
                  <br />
                  <Link href="#">Instagram</Link>
                </p>
              </div>
            </div>

            <div className="card mb-2 shadow-sm">
              <div className="card-body">
                <h3>Delivery</h3>
                <p>
                  Segunda-feira:{" "}
                  <strong className="text-danger">Fechado</strong>
                  <br />
                  Terça à domingo: 18:00 a 23:30
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-body shadow-sm">
                <h3>Takeout</h3>
                <p>
                  Segunda-feira:{" "}
                  <strong className="text-danger">Fechado</strong>
                  <br />
                  Terça à domingo: 18:00 a 23:30
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </LayoutGeneral>
  );
}

export default ContactPage;
