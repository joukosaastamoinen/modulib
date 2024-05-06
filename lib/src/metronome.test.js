import constant from "./constant.js";
import linear from "../test/linear.js";
import metronome from "./metronome.js";
import mix from "./mix.js";
import test from "../test/test.js";
import times from "../test/times.js";

test("zero tempo", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = constant(0);
  const generator = metronome(tempo)();

  const expected = [0, 0, 0];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should never trigger");
});

test("constant tempo of 0.5 per time step", (assert) => {
  assert.plan(1);
  const timeStep = 1234;
  const tempo = constant(1 / 2 / timeStep);
  const generator = metronome(tempo)();

  const expected = [1, 0, 1, 0];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger on even samples");
});

test("slowing tempo", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = mix(constant(0.6), linear(-0.04)); // start from 0.6 and slow down
  const generator = metronome(tempo)();

  const expected = [1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger less and less frequently");
});

test("constant tempo of minus 0.5 per time step", (assert) => {
  assert.plan(1);
  const timeStep = 0.123;
  const tempo = constant(-1 / 2 / timeStep);
  const generator = metronome(tempo)();

  const expected = [0, 1, 0, 1];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger on odd samples");
});

test("slowing negative tempo", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = mix(constant(-0.6), linear(0.04)); // start from -0.6 and slow down
  const generator = metronome(tempo)();

  const expected = [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger less and less frequently");
});

test("when time step and tempo are equal", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = constant(timeStep);
  const generator = metronome(tempo)();

  const expected = [1, 1, 1, 1];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger on every sample");
});

test("when tempo is minus time step", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = constant(-timeStep);
  const generator = metronome(tempo)();

  const expected = [1, 1, 1, 1];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(actual, expected, "should trigger on every sample");
});

test("positive tempo that does not align with samples", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = constant(0.4);
  const generator = metronome(tempo)();

  const expected = [1, 0, 1, 0, 0, 1];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(
    actual,
    expected,
    "should trigger on the samples that the beats fall in to",
  );
});

test("negative tempo that does not align with samples", (assert) => {
  assert.plan(1);
  const timeStep = 1;
  const tempo = constant(-0.4);
  const generator = metronome(tempo)();

  const expected = [0, 0, 1, 0, 1, 0];
  const actual = times(() => generator(timeStep), expected.length);
  assert.deepEqual(
    actual,
    expected,
    "should trigger on the samples that the beats fall in to",
  );
});
