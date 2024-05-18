import { TAU } from "./lib/constants.js";
import oscillator from "./lib/oscillator.js";

const sine = (phase: number) => Math.sin(TAU * phase);

export default oscillator(sine);
