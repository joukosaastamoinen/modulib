import { Readable } from "stream";
import Speaker from "speaker";
import { SignalGenerator } from "modulib";

type AudioStream = Readable & {
  bitDepth: number;
  channels: number;
  sampleRate: number;
};

const play = (Audio: SignalGenerator) => {
  const audio = Audio();

  const sampleRate = 44100;
  const timeStep = 1 / sampleRate;

  const readable = new Readable({ highWaterMark: 512 }) as AudioStream;
  readable.bitDepth = 16;
  readable.channels = 2;
  readable.sampleRate = sampleRate;
  readable._read = function read(n) {
    const sampleSize = this.bitDepth / 8;
    const blockAlign = sampleSize * this.channels;
    const numSamples = (n / blockAlign) | 0;
    const buf = Buffer.alloc(numSamples * blockAlign);
    const amplitude = 32760; // Max amplitude for 16-bit audio

    for (let i = 0; i < numSamples; i++) {
      const val = Math.max(-1, Math.min(1, audio(timeStep))) * amplitude;
      for (let channel = 0; channel < this.channels; channel++) {
        const offset = i * sampleSize * this.channels + channel * sampleSize;
        (buf[("writeInt" + this.bitDepth.toString() + "LE") as any] as any)(
          val,
          offset,
        );
      }
    }

    this.push(buf);
  };

  const speaker = new Speaker();
  readable.pipe(speaker);

  return (): Promise<void> =>
    new Promise((resolve) => {
      speaker.once("close", resolve);
      speaker.end();
    });
};

export default play;
