import './FileUploader.css';
import { DropArea } from './DropArea';
import { FileList } from './FileList';
// 파일 업로더 - 파일 드래그앤드롭 / 파일탐색기에서 파일 선택 / 업로드된 파일 리스트 보여주기
export const FileUploader = () => {
  return (
    <div className={'file-uploader'}>
      <DropArea />
      <FileList />
    </div>
  );
};
