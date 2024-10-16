const { calculateAsync } = require('../calculateAsync');

test('adds two numbers asynchronously', async () => {
  const result = await calculateAsync(5, 3, 'add');
  expect(result).toBe(8);
});

test('subtracts two numbers asynchronously', async () => {
  const result = await calculateAsync(9, 4, 'subtract');
  expect(result).toBe(5);
});

test('multiplies two numbers asynchronously', async () => {
  const result = await calculateAsync(3, 3, 'multiply');
  expect(result).toBe(9);
});

test('divides two numbers asynchronously', async () => {
  const result = await calculateAsync(10, 2, 'divide');
  expect(result).toBe(5);
});

test('throws an error for division by zero', async () => {
  expect.assertions(1);  // Make sure the error gets tested
  try {
    await calculateAsync(10, 0, 'divide');
  } catch (error) {
    expect(error.message).toBe('Cannot divide by zero');
  }
});