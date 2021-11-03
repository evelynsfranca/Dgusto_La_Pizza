import style from './Loading.module.css';

export interface IProps {
  isFullScreen?: string;
}

function Loading({ isFullScreen }: IProps): any {
  return (
    <div className={isFullScreen === 'true' ? style.loaderContainerFullscreen : style.loaderContainer}>
      <div className={style.loader}>&nbsp;</div>
    </div>
  )
};

export default Loading;
