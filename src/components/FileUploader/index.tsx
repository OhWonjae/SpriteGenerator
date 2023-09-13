import './FileUploader.css';
import { DropArea } from './DropArea';
import { FileList } from './FileList';
import { useAtom } from 'jotai/index';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
// 파일 업로더 - 파일 드래그앤드롭 / 파일탐색기에서 파일 선택 / 업로드된 파일 리스트 보여주기
export const FileUploader = () => {
  const [files, setFiles] = useAtom(FilesAtom);
  return (
    <div className={'file-uploader'}>
      <DropArea />
      {files.length > 0 && <FileList />}
    </div>
  );
};
