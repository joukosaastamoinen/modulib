import constant from "./constant.js";
import linear from "../test/linear.js";
import metronome from "./metronome.js";
import test from "../test/test.js";
import times from "../test/times.js";
import triangle from "./triangle.js";

test("shape", (assert) => {
  assert.plan(1);
  const timeStep = 1 / 16;
  const frequency = 2;
  const generator = triangle(constant(frequency))();

  const expected = [0, 0.5, 1, 0.5, 0, -0.5, -1, -0.5];
  const actual = times(() => generator(timeStep), 8);
  assert.deepEqual(actual, expected, "should produce a triangle wave");
});

test("periodicity", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const frequency = 1 / 4;
  const generator = triangle(constant(frequency))();

  const expected = [0, 1, 0, -1, 0, 1, 0, -1];
  const actual = times(() => generator(timeStep), 8);
  assert.deepEqual(actual, expected, "should repeat");
});

test("frequency change", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const generator = triangle(linear(0.01))();

  const expected = [0, 0.02, 0.08, 0.18];
  const actual = times(() => generator(timeStep), 4);
  assert.equalsApproximately(actual, expected, "should accelerate");
});

test("trigger", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const frequency = constant(1 / 4);
  const trigger = metronome(constant(0.5));
  const generator = triangle(frequency, trigger)();

  const expected = [0, 1, 0, 1, 0, 1, 0, 1];
  const actual = times(() => generator(timeStep), 8);
  assert.deepEqual(actual, expected, "should reset phase every other sample");
});
