import './FileList.css';
import { useAtom } from 'jotai/index';
import { DrawImagesAtom, FilesAtom } from '@/atoms/atoms';
import { Delete_icon } from '@/../public/assets/svg/delete_icon';
export const FileList = () => {
  const [files, setFiles] = useAtom(FilesAtom);
  const [, setDrawImages] = useAtom(DrawImagesAtom);
  const handleOnDeleteFile = (fileId: string) => {
    setFiles((files) => {
      return files.filter((f) => f.id !== fileId);
    });
    setDrawImages((images) => {
      return images.filter((f) => f.id !== fileId);
    });
  };
  return (
    <div
      className={'file-list'}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
      }}
    >
      <table className={'file-list-table'}>
        <colgroup>
          <col width="60%" />
          <col width="15%" />
          <col width="25%" />
        </colgroup>
        <thead className={'file-list-table-thead'}>
          <tr>
            <th>파일명</th>
            <th>크기</th>
            <th>타입</th>
          </tr>
        </thead>
        <tbody className={'file-list-table-tbody'}>
          {files.map((f) => (
            <tr key={f.id}>
              <td>
                <span>{f.name}</span>
                <span className={'delete-icon'}>
                  <button
                    onClick={() => {
                      handleOnDeleteFile(f.id);
                    }}
                  >
                    <Delete_icon width={15} height={15} />
                  </button>
                </span>
              </td>
              <td>{f.size}</td>
              <td>{f.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
