import { constant, sine, triangle, amp } from "audiate";

export default () =>
  triangle(
    amp(
      constant(220),
      sine(amp(constant(5), sine(amp(constant(10), sine(constant(0.7))))))
    )
  );
