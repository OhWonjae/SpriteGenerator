import './FileUploader.css';
export const FileUploader = () => {
  return (
    <div className={'file-uploader'}>
      <input type={'file'} name={'file'} id={'file'} />
      <label htmlFor={'file'} className={'btn-upload'}>
        <div>Upload</div>
      </label>
    </div>
  );
};
