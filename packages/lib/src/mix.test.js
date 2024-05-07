import assert from "node:assert/strict";
import constant from "./constant.js";
import mix from "./mix.js";
import test from "node:test";

test("one signal", () => {
  const value = 1;
  const signal = constant(value);
  const generator = mix(signal)();

  assert.equal(generator(), value, "should return the signal as is");
});

test("two signals", () => {
  const valueA = 1;
  const valueB = 2;
  const signalA = constant(valueA);
  const signalB = constant(valueB);
  const generator = mix(signalA, signalB)();

  assert.equal(generator(), valueA + valueB, "should mix the two signals");
});

test("three signals", () => {
  const valueA = 1;
  const valueB = 2;
  const valueC = 3;
  const signalA = constant(valueA);
  const signalB = constant(valueB);
  const signalC = constant(valueC);
  const generator = mix(signalA, signalB, signalC)();

  assert.equal(generator(), valueA + valueB + valueC, "should mix all signals");
});
