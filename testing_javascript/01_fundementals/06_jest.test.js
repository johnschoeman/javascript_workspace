const { sum, subtract, sumAsync, subtractAsync } = require("./math");

test("sumAsync", async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test("subtractAsync", async () => {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
