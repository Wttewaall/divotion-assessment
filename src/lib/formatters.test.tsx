import { describe, expect, test } from 'vitest';
import { toUintValue } from '@/lib/formatters';

describe('Formatters', () => {
  test('toIntValue', () => {
    expect(toUintValue('-12+3')).toBe(123);
    expect(toUintValue(-12 + 3)).toBe(9);
    expect(toUintValue('-0')).toBe(0);
    expect(toUintValue('1+1')).toBe(11);
  });
});
