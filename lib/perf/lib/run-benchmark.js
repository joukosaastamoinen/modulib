/* eslint-disable no-console */

const runBenchmark = (name, setup) => {
  const test = setup();
  console.time(name);
  test();
  console.timeEnd(name);
};

export default runBenchmark;
