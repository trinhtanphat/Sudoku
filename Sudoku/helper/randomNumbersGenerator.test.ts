import { randomNumbersGenerator } from "./randomNumbersGenerator";

it("has length of 9", () => {
  const result = randomNumbersGenerator();
  expect(result.length).toBe(9);
});

it("has different value", () => {
  const result = randomNumbersGenerator();
  const _set = new Set(result);
  expect(_set.size).toBe(9);
});
