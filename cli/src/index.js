#! /usr/bin/env node

import path from "path";
import { constant } from "modulib";
import play from "./play.js";
import Keyboard from "./keyboard.js";

const songPath = process.argv[2]
  ? path.join(process.cwd(), process.argv[2])
  : process.cwd();

const inputs = process.argv.slice(3);

process.stdin.setRawMode(true);
process.stdin.on("data", function (data) {
  if (data[0] === 3) {
    process.exit(1);
  }
});

const { frequency, trigger } = Keyboard(process.stdin);

import(songPath).then(({ default: Audio }) => {
  const audio = Audio(
    ...inputs.map((input) => {
      switch (input) {
        case "frequency":
          return frequency;
        case "trigger":
          return trigger;
        default:
          return constant(parseFloat(input));
      }
    })
  )();
  play(audio);
});
