# deck.zone

## Running deck.zone

* clone the repo
* npm install
* npm start

### Working on deck.zone

* play around in `src`

### Working on the Decklang Ace theme

* see `src/decklang/ace`

### Working on Decklang

* the Decklang grammar is in `decklang/` (it is parsed with [`nearley`](https://github.com/Hardmath123/nearley)), and can be rebuilt by running `npm run build:lang`
  * `decklang.ne` is the main file, including all of the plugins and primitives
  * `loops.ne` contains the loop implementation
  * `primitives.ne` contains all of the language primitives
  * `primitives_advanced.ne` contains all of the language primitives that are built on other primitives, or are lists used directly by plugins
  * `plugins/` contains all of the directives used by Decklang
* Decklang has a test program that showcases all of its current features in `decklang/test/testdeck.js` and can be tested by running `npm run test:lang`
* `src/decklang/decklang.js` is the outputted grammar for the language and is rebuilt every time Decklang is rebuilt
* `src/decklang/decklangparser.js` handles processing and pre-processing of any given script for Decklang
* `src/decklang/plugins.json` is a list of all plugins (from `decklang/plugins/`) that is built automatically when Decklang is rebuilt