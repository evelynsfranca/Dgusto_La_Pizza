import style from './RequestToday.module.css';

const RequestToday = ({ pageName }) => (
  <>
    <a href="https://wa.me/+5541999999999" target="_blank" className={['bannerCard', pageName].join(' ')}>
      <span className={style.bannerCardText}>
        Peça hoje mesmo!
        </span>
      <span className={style.bannerCardPhone}>
        (41) 99999-9999
      </span>
      <span className={style.bannerCardTextGreen}>
        Estamos abertos
      </span>
    </a>
  </>
);

export default RequestToday;
