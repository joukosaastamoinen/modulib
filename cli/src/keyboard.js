const notes = {
  113: 261.63, // C
  50: 277.18, // C#
  119: 293.66, // D
  51: 311.13, // D#
  101: 329.63, // E
  114: 349.23, // F
  53: 369.99, // F#
  116: 392, // G
  54: 415.3, // G#
  121: 440, // A
  55: 466.16, // A#
  117: 493.88, // B
  105: 523.25, // C
  57: 554.37, // C#
  111: 587.33, // D
  48: 622.25, // D#
  112: 659.25, // E
};

const Keyboard = (tty) => {
  const frequency = () => {
    let frequency = 0;
    let listening = false;
    let timeout = null;

    const handler = (data) => {
      const newFrequency = notes[data[0]];
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
    let timeout = null;

    const handler = (data) => {
      if (notes[data[0]] !== undefined) {
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
