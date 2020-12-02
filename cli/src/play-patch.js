import play from "./play.js";

const playPatch = (path, inputs) => {
  let aborted = false;
  let stop = null;

  import(`${path}?${Date.now()}`).then(({ default: Audio }) => {
    if (aborted) {
      return;
    }
    const audio = Audio(...inputs)();
    stop = play(audio);
  });

  return () => {
    if (stop) {
      return stop();
    }

    aborted = true;
    return Promise.resolve();
  };
};

export default playPatch;
