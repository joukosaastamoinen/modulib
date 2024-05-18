/* eslint-disable no-console */

const runBenchmark = (name: string, setup: () => () => void) => {
  const test = setup();
  console.time(name);
  test();
  console.timeEnd(name);
};

export default runBenchmark;
