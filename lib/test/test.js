import tape from "tape-catch";
import addAssertions from "extend-tape";

const DELTA = 1 / 4096;

const equalsApproximately = (a, b) =>
  typeof a === "number" && typeof b === "number" && Math.abs(a - b) < DELTA;

const arraysOfNumbersEqualApproximately = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.every((value, index) => equalsApproximately(value, b[index]));

const test = addAssertions(tape, {
  equalsApproximately(actual, expected, message) {
    this._assert(
      equalsApproximately(actual, expected) ||
        arraysOfNumbersEqualApproximately(actual, expected),
      {
        message: message || "should equal approximately",
        operator: "equalsApproximately",
        actual,
        expected,
      }
    );
  },
});

export default test;
