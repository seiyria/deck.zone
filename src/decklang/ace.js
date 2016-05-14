import plugins from './plugins.json';

// generate a list of valid plugin names for the syntax highlighter
const pluginNames = plugins.map(str => {
  const split = str.split('/');
  return split[split.length-1].split('.')[0];
});

ace.define('ace/mode/decklang', (require, exports) => {

  const oop = require('ace/lib/oop');
  const TextMode = require('ace/mode/text').Mode;
  const DecklangHighlightRules = require('ace/mode/decklang_highlight_rules').DecklangHighlightRules;

  const Mode = function() {
    this.HighlightRules = DecklangHighlightRules;
  };
  oop.inherits(Mode, TextMode);

  (() => {
  }).call(Mode.prototype);

  exports.Mode = Mode;
});

ace.define('ace/mode/decklang_highlight_rules', (require, exports) => {

  const oop = require('ace/lib/oop');
  const TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;

  const DecklangHighlightRules = function() {

    this.$rules = {
      start: [
        {
          token: 'constant.language',
          regex: /#[\d|A-Fa-f]{3,6}/
        },
        {
          token: 'constant.numeric',
          regex: /\d/
        },
        {
          token: 'string.quoted.double',
          regex: /"[a-zA-Z0-9]+"/
        },
        {
          token: 'comment.line.number-sign',
          regex: /^\s*#.+$/
        },
        {
          token: 'support.function',
          regex: new RegExp(`^\s*(${pluginNames.join('|')})`),
          caseInsensitive: true
        }
      ]
    };

  };

  oop.inherits(DecklangHighlightRules, TextHighlightRules);

  exports.DecklangHighlightRules = DecklangHighlightRules;
});