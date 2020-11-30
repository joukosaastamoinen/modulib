import { constant, sine, triangle, amp } from "modulib";

const mod = amp(constant(220), sine(constant(3.7)));

export default () => triangle(mod);
