import { FileUploader } from './index';
import { FileList } from './FileList';
import React from 'react';
import { render, getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FileUploader Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<FileUploader />);
    _container = container;
  });
  it('파일이 없으면 FileList가 사라짐', () => {
    if (_container == null) return;
    const element = screen.queryByText('파일명', { exact: true });
    expect(element).not.toBeInTheDocument();
  });
});
