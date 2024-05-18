import constant from "./constant.js";
import { equalApproximately } from "../test-utils/equals-approximately.js";
import linear from "../test-utils/linear.js";
import metronome from "./metronome.js";
import sine from "./sine.js";
import test from "node:test";
import times from "../test-utils/times.js";

test("shape", () => {
  const timeStep = 1 / 16;
  const frequency = 2;
  const generator = sine(constant(frequency))();

  const expected = [0, 0.7071, 1, 0.7071];
  const actual = times(() => generator(timeStep), 4);
  equalApproximately(actual, expected, "should produce a sine wave");
});

test("periodicity", () => {
  const timeStep = 1;
  const frequency = 1 / 4;
  const generator = sine(constant(frequency))();

  const expected = [0, 1, 0, -1, 0, 1, 0, -1];
  const actual = times(() => generator(timeStep), 8);
  equalApproximately(actual, expected, "should repeat");
});

test("frequency change", () => {
  const timeStep = 1;
  const generator = sine(linear(0.01))();

  const expected = [0, 0.0314, 0.1253, 0.279];
  const actual = times(() => generator(timeStep), 4);
  equalApproximately(actual, expected, "should accelerate");
});

test("trigger", () => {
  const timeStep = 1;
  const frequency = constant(1 / 4);
  const trigger = metronome(constant(0.5));
  const generator = sine(frequency, trigger)();

  const expected = [0, 1, 0, 1, 0, 1, 0, 1];
  const actual = times(() => generator(timeStep), 8);
  equalApproximately(actual, expected, "should reset phase every other sample");
});
