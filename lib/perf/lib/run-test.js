/* eslint-disable no-console */

const runTest = (name, setup) => {
  const test = setup();
  console.time(name);
  test();
  console.timeEnd(name);
};

export default runTest;
