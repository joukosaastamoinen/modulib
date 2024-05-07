// Invoke a function n times. Returns an
// array of the results of each invocation.
const times = (fn, n) => {
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(fn());
  }
  return res;
};

export default times;
