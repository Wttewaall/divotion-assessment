import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Renders', () => {
  test('Home page', () => {
    render(<Home />);

    expect(screen.getByLabelText('brand logo')).toBeDefined();
    // expect(screen.getByRole('heading', { level: 2, name: 'HELLO:' })).toBeDefined();

    // console.log(screen.getByTestId('products-list').children.length);
  });
});
