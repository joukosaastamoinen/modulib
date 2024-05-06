import { amp, constant, sine, triangle } from "modulib";

const mod = amp(constant(220), sine(constant(3.7)));

export default () => triangle(mod);
