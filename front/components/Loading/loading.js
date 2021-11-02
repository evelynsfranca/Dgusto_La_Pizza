import style from './Loading.module.css';

const Loading = ({isFullScreen}) => (
  <>
    <div className={isFullScreen === 'true' ? style.loaderContainerFullscreen : style.loaderContainer}>
      <div className={style.loader}>&nbsp;</div>
    </div>
  </>
);

export default Loading;
