const MAX_SAMPLES = 32768;

const delay = (Input, Amount, Feedback) => () => {
  const getAmount = Amount();
  const getFeedback = Feedback();
  const getInput = Input();
  const buffer = new Array(MAX_SAMPLES);
  buffer.fill(0);
  let bufferPosition = 0;
  return (step) => {
    const amount = getAmount(step);
    const feedback = getFeedback(step);
    const input = getInput(step);
    const value = buffer[bufferPosition];
    buffer[(bufferPosition + Math.floor(amount / step)) % buffer.length] =
      input + value * feedback;
    bufferPosition = (bufferPosition + 1) % buffer.length;
    return value;
  };
};

export default delay;
