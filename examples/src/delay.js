import { ad, amp, constant, delay, metronome, mix, sine } from "modulib";

const bpm = 60;
const tempo = bpm / 60;
const click = metronome(constant(tempo));

export default () => {
  const signal = sine(
    amp(constant(300), ad(constant(0.1), constant(0.2), click)),
    click,
  );
  return amp(
    mix(signal, delay(signal, constant(1 / tempo / 4), constant(0.2))),
    constant(0.3),
  );
};
