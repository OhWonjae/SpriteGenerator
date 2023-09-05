import './DropArea.css';
import uploaderImg from '/public/assets/uploader_icon.png';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';
export const DropArea = () => {
  const [files, setFiles] = useAtom(FilesAtom);

  const handleOnFileList = (e: ChangeEvent<HTMLInputElement>) => {
    const arr = [...e.target.files] as File[];
    setFiles((files) => [...files, ...arr]);
  };

  return (
    <div className={'drop-area'} onMouse>
      <div className={'uploader-img'}>
        <img src={uploaderImg} />
        <div className={'uploader-text'}>Drag & Drop</div>
      </div>
      <div>
        <input
          onChange={handleOnFileList}
          type={'file'}
          name={'file'}
          id={'file'}
          accept={'image/*,png,jpg'}
          multiple={true}
        />
        <label htmlFor={'file'} className={'btn-upload'}>
          파일 탐색기
        </label>
      </div>
    </div>
  );
};
