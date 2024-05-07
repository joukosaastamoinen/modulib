import runBenchmark from "./lib/run-benchmark.js";

const TEST_DIR = "./tests";

const tests = ["sine-single-function", "sine"];

const run = async () => {
  for (const testModule of tests) {
    const { default: test } = await import(`${TEST_DIR}/${testModule}.js`);
    runBenchmark(testModule, test);
  }
};

run();
