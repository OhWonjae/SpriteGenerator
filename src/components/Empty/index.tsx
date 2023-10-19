import './Empty.css';
import { DropArea } from '@/components/FileUploader/DropArea';
// 파일이 업로드 되지않았을때 빈 컨텐츠
export const Empty = () => {
  return (
    <div className={'empty'}>
      <DropArea />
    </div>
  );
};
