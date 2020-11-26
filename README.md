# Audiate

Audiate is a modular synthesis library for JavaScript. You can create simple
patches with it and export them as audio files, or you can create entire tracks
with it.

Creating patches with code is awesome, because:

- **It's powerful;** wire up 100 oscillators through filters to a mixer with
  a few lines of code. No manual wiring needed.
- **It's limiting;** there are no presets to drown in or a gazillion plugins
  to buy. Just focus on the sound.
- **It's different;** acoustic instruments and analog synthesizers have their
  own sound. The computer has its own sound too, expressed in code.

## Quick start

To start making patches with Audiate, you need:

- [A code editor](https://atom.io/)
- [Node.js](https://nodejs.org/en/)

When you've installed Node.js, open up a terminal and install the `audiate`
command line tool:

```
npm install -g audiate-cli
```

With the command line tool installed, you can create a patch:

```
audiate new my-patch
```

This creates a new folder named `my-patch` and installs some necessary stuff
inside it. To play the default patch, do:

```
cd my-patch    # Go to the folder
audiate        # Play the patch in the current folder
```

**You're all set!**

Now open `index.js` inside the folder in your code editor and start tweaking!
You can keep the audio playing while you're editing the code and when you hit
save, the command line tool reloads the patch so you can hear your
changes immediatelly.

To export your patch as an audio file, go to the terminal window where the patch
is playing and hit `e` on your keyboard. This will pause the audio and export it
as AIFF inside the `export` sub-folder.

For more advanced export options, you can use the `audiate export` command. Type
`audiate export --help` in the command line to see what it can do.

## Short tutorial

The default patch plays a triangle wave. That's not terribly exciting, so let's
modulate it with a sine wave:

TODO
