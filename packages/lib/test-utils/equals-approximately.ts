import assert from "node:assert/strict";

const DELTA = 1 / 4096;

export const compareNumbers = (a: number, b: number) => Math.abs(a - b) < DELTA;

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((item) => typeof item === "number");

function equalApproximately(a: number, b: number, message?: string): void;

function equalApproximately(a: number[], b: number[], message?: string): void;

function equalApproximately(a: unknown, b: unknown, message?: string) {
  if (typeof a === "number" && typeof b === "number") {
    assert(
      compareNumbers(a, b),
      message ?? "Expected values to approximately equal",
    );
  }
  if (isNumberArray(a) && isNumberArray(b)) {
    assert(
      a.length === b.length,
      message ?? "Expected arrays to be of same length",
    );
    for (let i = 0; i < a.length; i++) {
      const valueA = a[i];
      const valueB = b[i];
      assert(
        compareNumbers(valueA!, valueB!),
        "Expected values to be approximately equal",
      );
    }
  }
  throw new Error("Cannot compare values of unknown type");
}

export { equalApproximately };
