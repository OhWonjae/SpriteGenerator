import './FileList.css';
import { EmptyList } from './EmptyList';
export const FileList = () => {
  return (
    <div className={'file-list'}>
      {/*<EmptyList />*/}
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
          <tr>
            <td>asdf</td>
            <td>200MB</td>
            <td>loading</td>
          </tr>
          <tr>
            <td>asdf</td>
            <td>200MB</td>
            <td>loading</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
