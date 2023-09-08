import { DropArea } from './index';
import { FileList } from '../FileList';
import React from 'react';
import {
  render,
  getByText,
  screen,
  fireEvent,
  waitFor,
  createEvent,
} from '@testing-library/react';
describe('Drag & Drop Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<DropArea />);
    _container = container;
  });
  it('Drag&Drop시 파일 세팅됨', () => {
    if (_container == null) return;
    render(<FileList />);
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
  it('Drag&Drop시 이미지 파일이 아니라면 예외처리', async () => {
    if (_container == null) return;
    const DragDrop = getByText(_container, 'Drag & Drop');
    expect(DragDrop).toBeInTheDocument();
    const fakeFile = new File(['hello'], 'hello.txt');
    const dropEvent = createEvent.drop(DragDrop);
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        files: [fakeFile],
      },
    });
    window.alert = jest.fn();
    fireEvent(DragDrop, dropEvent);
    expect(window.alert).toBeCalledWith('이미지 파일을 넣어주세요');
  });
});
