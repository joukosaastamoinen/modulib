const notes: Record<number, number> = {
  97: 261.63, // C
  119: 277.18, // C#
  115: 293.66, // D
  101: 311.13, // D#
  100: 329.63, // E
  102: 349.23, // F
  116: 369.99, // F#
  103: 392, // G
  121: 415.3, // G#
  104: 440, // A
  117: 466.16, // A#
  106: 493.88, // B
  107: 523.25, // C
  111: 554.37, // C#
  108: 587.33, // D
  112: 622.25, // D#
};

const Keyboard = (tty: typeof process.stdin) => {
  const frequency = () => {
    let frequency = 0;
    let listening = false;
    let timeout: NodeJS.Timeout | null = null;

    const handler = (data: Buffer) => {
      const newFrequency = data[0] && notes[data[0]];
      if (newFrequency !== undefined) {
        frequency = newFrequency;
      }
    };

    const ensureListening = () => {
      if (!listening) {
        listening = true;
        tty.on("data", handler);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        if (listening) {
          tty.off("data", handler);
          listening = false;
        }
      }, 1000);
    };

    return () => {
      ensureListening();
      return frequency;
    };
  };

  const trigger = () => {
    let keyPressed = false;
    let listening = false;
    let timeout: NodeJS.Timeout | null = null;

    const handler = (data: Buffer) => {
      if ((data[0] && notes[data[0]]) !== undefined) {
        keyPressed = true;
      }
    };

    const ensureListening = () => {
      if (!listening) {
        listening = true;
        tty.on("data", handler);
      }

      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        if (listening) {
          tty.off("data", handler);
          listening = false;
        }
      }, 1000);
    };

    return () => {
      ensureListening();
      if (keyPressed) {
        keyPressed = false;
        return 1;
      }
      return 0;
    };
  };

  return { frequency, trigger };
};

export default Keyboard;
