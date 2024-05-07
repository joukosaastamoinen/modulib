import { amp, constant, sine, triangle } from "modulib";

export default () =>
  triangle(
    amp(
      constant(220),
      sine(amp(constant(5), sine(amp(constant(10), sine(constant(0.7)))))),
    ),
  );
