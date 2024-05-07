import assert from "node:assert/strict";
import funcToModule from "./func-to-module.js";
import test from "node:test";

test("arity of 0", () => {
  const timeStep = 321;
  const returnValue = 123;
  const fn = () => returnValue;
  const generator = funcToModule(fn)()();

  assert.equal(
    generator(timeStep),
    returnValue,
    "should yield the return value of fn",
  );
});

test("arity of 1", () => {
  const timeStep = 234;
  const arg = 456;
  const fn = (x) => x * 123;
  const generator = funcToModule(fn)(() => (step) => arg * step)();

  assert.equal(
    generator(timeStep),
    fn(arg * timeStep),
    "should yield the return value of fn",
  );
});

test("arity of 2", () => {
  const timeStep = 123;
  const arg1 = 456;
  const arg2 = 786;
  const fn = (a, b) => a * 123 + b * 456;
  const generator = funcToModule(fn)(
    () => (step) => arg1 * step,
    () => (step) => arg2 * step,
  )();

  assert.equal(
    generator(timeStep),
    fn(arg1 * timeStep, arg2 * timeStep),
    "should yield the return value of fn",
  );
});
