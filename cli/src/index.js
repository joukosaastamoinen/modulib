#! /usr/bin/env node

import fs from "fs";
import path from "path";
import { keyboard } from "modulib";
import playPatch from "./play-patch.js";

const { frequency, trigger } = keyboard(process.stdin);

const patchPath = process.argv[2]
  ? path.join(process.cwd(), process.argv[2])
  : process.cwd();

const inputs = process.argv.slice(3).map((input) => {
  switch (input) {
    case "frequency":
      return frequency;
    case "trigger":
      return trigger;
    default:
      return constant(parseFloat(input));
  }
});

process.stdin.setRawMode(true);
process.stdin.on("data", function (data) {
  if (data[0] === 3) {
    process.exit(1);
  }
});

let stop = playPatch(patchPath, inputs);
let restarting = false;

fs.watch(patchPath, {}, (event) => {
  if (event === "change") {
    if (restarting) {
      return;
    }
    restarting = true;
    stop().then(() => {
      stop = playPatch(patchPath, inputs);
      restarting = false;
    });
  }
});
