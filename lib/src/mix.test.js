import test from "../test/test.js";
import constant from "./constant.js";
import mix from "./mix.js";

test("one signal", (assert) => {
  assert.plan(1);

  const value = 1;
  const signal = constant(value);
  const generator = mix(signal)();

  assert.equal(generator(), value, "should return the signal as is");
});

test("two signals", (assert) => {
  assert.plan(1);

  const valueA = 1;
  const valueB = 2;
  const signalA = constant(valueA);
  const signalB = constant(valueB);
  const generator = mix(signalA, signalB)();

  assert.equal(generator(), valueA + valueB, "should mix the two signals");
});

test("three signals", (assert) => {
  assert.plan(1);

  const valueA = 1;
  const valueB = 2;
  const valueC = 3;
  const signalA = constant(valueA);
  const signalB = constant(valueB);
  const signalC = constant(valueC);
  const generator = mix(signalA, signalB, signalC)();

  assert.equal(generator(), valueA + valueB + valueC, "should mix all signals");
});
