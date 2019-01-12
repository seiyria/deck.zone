# deck.zone

# Setup

* clone repo
* `npm i`
* `npm start`

## Adding a New Plugin

* Create the `.ne` file in `decklang/plugins`
* Include the `.ne` file in `decklang/_directives`
* Add the new directive to the `Directives ->` line in `decklang/_directives`
* Add a definition file in `src/decklang/plugins/`
* Add the export for the definition file in `src/decklang/plugins/_plugins.js`