import './FileList.css';
import { EmptyList } from './EmptyList';
import { useAtom } from 'jotai/index';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
export const FileList = () => {
  const [files, setFiles] = useAtom(FilesAtom);
  return (
    <div className={'file-list'}>
      {files.length > 0 ? (
        <>
          <table className={'file-list-table'}>
            <colgroup>
              <col width="60%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead className={'file-list-table-thead'}>
              <tr>
                <th>파일명</th>
                <th>크기</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody className={'file-list-table-tbody'}>
              {files.map((f) => (
                <tr key={f.lastModified}>
                  <td>{f.name}</td>
                  <td>{f.size}</td>
                  <td>loading</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <EmptyList />
        </>
      )}
    </div>
  );
};
