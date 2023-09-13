import './DropArea.css';
import uploaderImg from '/public/assets/uploader_icon.png';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';
import { v4 } from 'uuid';
export const DropArea = () => {
  const [files, setFiles] = useAtom(FilesAtom);

  const checkImageFileType = (fileName: string) => {
    const standards = ['png', 'jpg', 'jpeg', 'png', 'svg'];
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    for (const s of standards) {
      if (s === extension) {
        return true;
      }
    }
    return false;
  };
  const handleOnFileList = (e: ChangeEvent<HTMLInputElement>) => {
    const arr = [...e.target.files] as Attachment[];
    for (const file of arr) {
      const id = v4();
      file.id = id;
    }
    setFiles((files) => [...files, ...arr]);
    e.target.value = '';
  };
  return (
    <div
      className={files.length > 0 ? 'drop-area' : 'drop-area-empty'}
      onDrop={(e) => {
        e.preventDefault();
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          if (!checkImageFileType(e.dataTransfer.files[i].name)) {
            alert('이미지 파일을 넣어주세요');
            return;
          }
        }
        console.log('dropEvnet', [...files, ...e.dataTransfer.files]);
        const arr = [...e.dataTransfer.files] as Attachment[];
        for (const file of arr) {
          const id = v4();
          file.id = id;
        }
        setFiles((f) => {
          return [...f, ...arr];
        });
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
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
