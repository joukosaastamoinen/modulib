import test from "../test/test.js";
import linear from "../test/linear.js";
import times from "../test/times.js";
import constant from "./constant.js";
import metronome from "./metronome.js";
import sine from "./sine.js";

test("shape", (assert) => {
  assert.plan(1);
  const timeStep = 1 / 16;
  const frequency = 2;
  const generator = sine(constant(frequency))();

  const expected = [0, 0.7071, 1, 0.7071];
  const actual = times(() => generator(timeStep), 4);
  assert.equalsApproximately(actual, expected, "should produce a sine wave");
});

test("periodicity", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const frequency = 1 / 4;
  const generator = sine(constant(frequency))();

  const expected = [0, 1, 0, -1, 0, 1, 0, -1];
  const actual = times(() => generator(timeStep), 8);
  assert.equalsApproximately(actual, expected, "should repeat");
});

test("frequency change", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const generator = sine(linear(0.01))();

  const expected = [0, 0.0314, 0.1253, 0.279];
  const actual = times(() => generator(timeStep), 4);
  assert.equalsApproximately(actual, expected, "should accelerate");
});

test("trigger", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const frequency = constant(1 / 4);
  const trigger = metronome(constant(0.5));
  const generator = sine(frequency, trigger)();

  const expected = [0, 1, 0, 1, 0, 1, 0, 1];
  const actual = times(() => generator(timeStep), 8);
  assert.equalsApproximately(
    actual,
    expected,
    "should reset phase every other sample"
  );
});
