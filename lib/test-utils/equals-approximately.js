import assert from "node:assert/strict";

const DELTA = 1 / 4096;

const numbersEqualsApproximately = (a, b) =>
  typeof a === "number" && typeof b === "number" && Math.abs(a - b) < DELTA;

const arraysOfNumbersEqualApproximately = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.every((value, index) => numbersEqualsApproximately(value, b[index]));

export const equalsApproximately = (actual, expected, message) => {
  assert(
    numbersEqualsApproximately(actual, expected) ||
      arraysOfNumbersEqualApproximately(actual, expected),
    {
      message: message ?? "should equal approximately",
      operator: "equalsApproximately",
      actual,
      expected,
    },
  );
};
