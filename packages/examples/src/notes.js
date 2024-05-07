import { ad, amp, constant, triangle } from "modulib";

export default (trigger, frequency) =>
  amp(triangle(frequency), ad(constant(0.1), constant(0.8), trigger));
