import { OutputArea } from './index';
import React from 'react';
import { render, getByText } from '@testing-library/react';
import { DrawImagesAtom } from '@/atoms/atoms';
import { JotaiProvider } from '@/helpers/test';

describe('OutputArea Test', () => {
  let _container: HTMLElement | null = null;
  beforeEach(() => {
    const { container } = render(
      <JotaiProvider
        initialValues={[
          [
            DrawImagesAtom,
            [{ x: 0, y: 0, w: 100, h: 100, id: 'id', name: 'testImage' }],
          ],
        ]}
      >
        <OutputArea />
      </JotaiProvider>,
    );
    _container = container;
  });
  it('파일이 있으면 Output Style 텍스트 생김', async () => {
    if (_container == null) return;
    const element = getByText(_container, /.sprite-testImage/i);
    expect(element).toBeInTheDocument();
  });
});
