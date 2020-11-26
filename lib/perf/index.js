import runTest from "./lib/run-test.js";

const TEST_DIR = "./tests";

const tests = ["sine-single-function", "sine"];

const run = async () => {
  for (const testModule of tests) {
    const { default: test } = await import(`${TEST_DIR}/${testModule}.js`);
    runTest(testModule, test);
  }
};

run();
