import React from 'react';
import { FileList } from './index';
import { DropArea } from '../DropArea';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByText,
  findByText,
  queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

describe('FileList Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<FileList />);
    _container = container;
    render(<DropArea />);
  });
  afterEach(() => {
    _container = null;
  });
  it('파일이 있으면 table ui 생김', async () => {
    if (_container == null) return;
    const inputFile = screen.getByLabelText(/파일 탐색기/i, { exact: false });
    const fakeFile = new File(['hello'], 'hello1.png', { type: 'image/png' });
    await userEvent.upload(inputFile, [fakeFile]);
    screen.getByText(/hello1.png/i, { exact: true });
  });
  it('삭제버튼 누르면 파일 삭제됨', async () => {
    if (_container == null) return;
    const inputFile = screen.getByLabelText(/파일 탐색기/i, { exact: false });
    const fakeFile = new File(['hello'], 'hello2.png', { type: 'image/png' });
    await userEvent.upload(inputFile, [fakeFile]);
    screen.getByText(/hello2.png/i, { exact: true });
    const deleteButtons = document.getElementsByClassName('delete-icon');
    console.log('btn2!! :', deleteButtons[0], deleteButtons[1]);
    const deleteButton = deleteButtons[1].getElementsByTagName('button')[0];
    fireEvent.click(deleteButton);
    await waitFor(() => {
      if (_container) {
        const text = queryByText(_container, 'hello2.png');
        expect(text).not.toBeInTheDocument();
      }
    });
  });
});
