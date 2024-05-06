import funcToModule from "./lib/func-to-module.js";
import sum from "./lib/sum.js";

const mix = funcToModule(sum);

export default mix;
