#! /usr/bin/env node

import path from "path";
import play from "./lib/play.js";

const songPath = process.argv[2]
  ? path.join(process.cwd(), process.argv[2])
  : process.cwd();

import(songPath).then(({ default: Audio }) => {
  play(Audio);
});
