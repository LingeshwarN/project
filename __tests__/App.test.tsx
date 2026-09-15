/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { sanitizeCategoryList, sanitizeFoodProduct } from '../src/api/foodApi';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('category values are normalized to stable strings for list keys', () => {
  const result = sanitizeCategoryList([
    { name: 'Indian' },
    'Chinese',
    { name: 'Fast Food' },
    'Desserts',
  ]);

  expect(result).toEqual(['Indian', 'Chinese', 'Fast Food', 'Desserts']);
  expect(result.every((value) => typeof value === 'string')).toBe(true);
});

test('non-food catalog items like bed and sofa are filtered out', () => {
  expect(sanitizeFoodProduct({ title: 'Luxury Wooden Sofa', category: 'furniture' })).toBe(false);
  expect(sanitizeFoodProduct({ title: 'Butter Chicken Masala', category: 'Indian' })).toBe(true);
  expect(sanitizeFoodProduct({ title: 'Margherita Pizza', category: 'Italian' })).toBe(true);
});
