import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProductCardSmall } from '@/components/productCardSmall';

const product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: { rate: 3.9, count: 120 },
};

describe('ProductCardSmall Component', () => {
  // state
  let amount: number = 1;
  const setAmount = (value: number) => (amount = Math.max(0, value));

  let active: boolean = true;
  const setActive = (value: boolean) => (active = value);

  // handlers
  const toggleHandler = vi.fn(() => setActive(!active));
  const incrementHandler = vi.fn(() => setAmount(amount + 1));
  const changeHandler = vi.fn((value: string) => setAmount(parseInt(value) || 0));
  const decrementHandler = vi.fn(() => setAmount(amount - 1));

  render(
    <ProductCardSmall
      key={product.id}
      product={product}
      active={active}
      amount={amount}
      onFavoriteClick={toggleHandler}
      onIncrementClick={incrementHandler}
      onInputChange={changeHandler}
      onDecrementClick={decrementHandler}
    />
  );

  beforeEach(() => {
    // reset state
    setAmount(1);
    setActive(true);
  });

  test('Increment by 1', async () => {
    const incrementButton = screen.getByLabelText<HTMLButtonElement>('increment');
    expect(incrementButton).toBeDefined();

    fireEvent.click(incrementButton);
    expect(incrementHandler).toBeCalledTimes(1);

    expect(amount).toBe(2);
  });

  test('User set amount to 5', async () => {
    const inputField = screen.getByLabelText<HTMLInputElement>('amount');
    expect(inputField).toBeDefined();

    fireEvent.change(inputField, { target: { value: '5' } });
    expect(changeHandler).toBeCalledTimes(1);

    expect(amount).toBe(5);
  });

  test('Decrement by 1', async () => {
    const decrementButton = screen.getByRole<HTMLButtonElement>('button', { name: 'decrement' });
    expect(decrementButton).toBeDefined();

    fireEvent.click(decrementButton);
    expect(decrementHandler).toBeCalledTimes(1);

    expect(amount).toBe(0);
  });

  test('Set to -10, should be minimum of 0', async () => {
    const inputField = screen.getByLabelText<HTMLInputElement>('amount');
    expect(inputField).toBeDefined();

    fireEvent.change(inputField, { target: { value: '-10' } });
    expect(changeHandler).toBeCalledTimes(2);

    expect(amount).toBe(0);
  });
});
