import { FileList } from './index';
import { DropArea } from '../DropArea';
import React from 'react';
import {
  render,
  getByText,
  screen,
  fireEvent,
  getByLabelText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FileList Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<FileList />);
    _container = container;
  });
  it('파일이 없으면 EmptyList 사용', () => {
    if (_container == null) return;
    const EmptyText = getByText(_container, '파일을 업로드해 주세요.');
    expect(EmptyText).toBeInTheDocument();
  });
  it('파일이 있으면 table ui 생김', async () => {
    if (_container == null) return;
    render(<DropArea />);
    const inputFile = screen.getByLabelText(/파일 탐색기/i, { exact: false });
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(inputFile, [fakeFile]);
    screen.getByText(/hello.png/i, { exact: true });
  });
});

describe('Drag & Drop Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<DropArea />);
    _container = container;
  });
  it('Drag&Drop시 파일 세팅됨', () => {
    if (_container == null) return;
    const DragDrop = getByText(_container, 'Drag & Drop');
    expect(DragDrop).toBeInTheDocument();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.drop(DragDrop, {
      dataTransfer: {
        files: [fakeFile],
      },
    });
    screen.getByText(/hello.png/i, { exact: true });
  });
});
