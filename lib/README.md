# Modulib

Modulib is a modular synthesis library for JavaScript. Use it to create UI sounds or sound effects for games.

Creating modular patches with code is awesome, because:

- **It's powerful;** wire up 100 oscillators through filters to a mixer with
  a few lines of code. No manual wiring needed.
- **It's different;** acoustic instruments and analog synthesizers have their
  own sound. The computer has its own sound too.

## Quick start

To start making patches with Modulib, you need:

- [A code editor](https://atom.io/)
- [Node.js](https://nodejs.org/en/)

When you've installed Node.js, setup a project for your first patch:

```
npm init              # Create a package.json for dependencies
npm install modulib   # Install the Modulib library
```

Then, create a simple patch:

```
// my-patch.js
import { constant, sine } from "modulib";

export default () => sine(constant(440));
```

To play the patch, use the Modulib command line tool:

```
npm install -g modulib-cli  # Install the tool
play-patch my-patch.js      # Play the patch
```

Happy patching!
