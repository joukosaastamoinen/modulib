# Audiate

Modular synthesis with JavaScript

## Example

1.  Install `Audiate` library with `npm`

    ```
    npm install audiate
    ```

2.  Create a `song.js` file:

    ```
    const {constant, sine} = require('audiate')
    module.exports = () => sine(constant(440))
    ```

3.  Use the Audiate command line interface to play the song:

    ```
    npm install -g audiate-cli
    audiate song.js
    ```
