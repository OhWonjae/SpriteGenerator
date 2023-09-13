import { SpriteArea } from './index';
import React from 'react';
import { render, getByText, screen } from '@testing-library/react';
describe('SpriteArea Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(<SpriteArea />);
    _container = container;
  });
  it('파일이 없으면 Empty SpriteArea 사용', () => {
    if (_container == null) return;
    const EmptyText = getByText(_container, '파일을 업로드해 주세요.');
    expect(EmptyText).toBeInTheDocument();
  });
});
