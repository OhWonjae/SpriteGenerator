import './DropArea.css';
import uploaderImg from '/public/assets/uploader_icon.png';
export const DropArea = () => {
  return (
    <div className={'drop-area'}>
      <div className={'uploader-img'}>
        <img src={uploaderImg} />
        <div className={'uploader-text'}>Drag & Drop</div>
      </div>
      <div>
        <input type={'file'} name={'file'} id={'file'} />
        <label htmlFor={'file'} className={'btn-upload'}>
          파일 탐색기
        </label>
      </div>
    </div>
  );
};
