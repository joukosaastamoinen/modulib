import { SignalGenerator, ad, amp, constant, triangle } from "modulib";

export default (trigger: SignalGenerator, frequency: SignalGenerator) =>
  amp(triangle(frequency), ad(constant(0.1), constant(0.8), trigger));
