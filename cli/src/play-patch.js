import play from "./play.js";

const playPatch = (path, inputs) => {
  let aborted = false;
  let stop = null;

  import(`${path}?${Date.now()}`).then(({ default: patch }) => {
    if (aborted) {
      return;
    }
    stop = play(patch(...inputs));
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
