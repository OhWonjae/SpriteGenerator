import { DropArea } from './DropArea';
import React from 'react';
import { render, screen, getByText } from '@testing-library/react';

describe('<DefaultArea />', () => {
  it('renders header', () => {
    const { container } = render(<DropArea />);
    const header = getByText(container, 'Drag & Drop');
    expect(header).toBeInTheDocument();
  });
});
