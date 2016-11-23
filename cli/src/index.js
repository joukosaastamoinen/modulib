#! /usr/bin/env node

const play = require('./lib/play')
const path = require('path')

const songPath = process.argv[2] ?
  path.join(process.cwd(), process.argv[2]) :
  process.cwd()

const Audio = require(songPath)

play(Audio)
