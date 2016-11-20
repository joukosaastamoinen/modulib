#! /usr/bin/env node

const path = require('path')
const Readable = require('stream').Readable
const Speaker = require('speaker')

const sampleRate = 44100

const Audio = process.argv[2] ?
  require(path.join(process.cwd(), process.argv[2])) :
  require(process.cwd())

const audio = Audio()(1 / sampleRate)

const readable = new Readable()
readable.bitDepth = 16
readable.channels = 2
readable.sampleRate = sampleRate
readable._read = read

readable.pipe(new Speaker())

function read (n) {
  const sampleSize = this.bitDepth / 8
  const blockAlign = sampleSize * this.channels
  const numSamples = n / blockAlign | 0
  const buf = new Buffer(numSamples * blockAlign)
  const amplitude = 32760 // Max amplitude for 16-bit audio

  for (let i = 0; i < numSamples; i++) {
    const val = audio() * amplitude
    for (let channel = 0; channel < this.channels; channel++) {
      const offset = (i * sampleSize * this.channels) + (channel * sampleSize)
      buf['writeInt' + this.bitDepth + 'LE'](val, offset)
    }
  }

  this.push(buf)
}
