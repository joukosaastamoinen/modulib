import { SignalGenerator } from "./types.js";

const constant =
  (value: number): SignalGenerator =>
  () =>
  () =>
    value;

export default constant;
