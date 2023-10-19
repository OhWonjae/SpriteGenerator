import { SpriteArea } from './index';
import React from 'react';
import { render, getByText, waitFor, screen } from '@testing-library/react';
import { JotaiProvider } from '@/helpers/test';
import { FilesAtom } from '@/atoms/atoms';
import { Attachment } from '@/types/common';
describe('SpriteArea Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    // const { container } = render(<SpriteArea />);
    // _container = container;
  });
  it('파일이 없으면 Empty SpriteArea 사용', () => {
    const { container } = render(<SpriteArea />);
    _container = container;
    if (_container == null) return;
    // const EmptyText = getByText(_container, '파일을 업로드해 주세요.');
    // expect(EmptyText).toBeInTheDocument();
  });
  it('image 캔버스 테스트', () => {
    const fakeFile: Attachment = {
      ...new File(['hello'], 'hello.png', {
        type: 'image/png',
      }),
      id: 'id',
      name: 'hello.png',
      size: 1000,
      type: 'image/png',
    };
    const { container } = render(
      <JotaiProvider initialValues={[[FilesAtom, [fakeFile]]]}>
        <SpriteArea />
      </JotaiProvider>,
    );
    waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
