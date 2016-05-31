import plugins from '../plugins.json';
import decklangLight from './ace-decklang-light.less';
import 'brace/ext/language_tools.js';

import _ from 'lodash';

import * as Plugins from '../plugins/_plugins';

// generate a list of valid plugin names for the syntax highlighter

ace.define('ace/mode/decklang', (require, exports) => {

  const oop = require('ace/lib/oop');
  const TextMode = require('ace/mode/text').Mode;
  const DecklangHighlightRules = require('ace/mode/decklang_highlight_rules').DecklangHighlightRules;

  const Mode = function() {
    this.HighlightRules = DecklangHighlightRules;
  };
  oop.inherits(Mode, TextMode);

  (() => {}).call(Mode.prototype);

  exports.Mode = Mode;
});

ace.define('ace/snippets/decklang', (require, exports) => {

  const baseSnippets = [`
snippet loop
\tloop = <\${1:i} = \${2:1}> to \${3:10}
\t\t\${4}
\tendloop

snippet loopin
\tloop = <\${1:item}> in { \${2} }
\t\t\${3}
\tendloop
`];

  exports.snippetText = _.flatten(baseSnippets.concat(_.map(_.values(Plugins), p => p.snippets))).join('');
});

ace.define('ace/theme/decklang-light', ['require','exports','module','ace/lib/dom'], function(require, exports) {

  exports.isDark = false;
  exports.cssClass = 'ace-decklang-light';
  exports.cssText = decklangLight;

  const dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
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
          token: 'storage.type',
          regex: /(\[\w+])/
        },
        {
          token: 'string.quoted.double',
          regex: /"[^\n]+"/
        },
        {
          token: 'variable.other',
          regex: /<[\w\s=\+\/\*-\[\]\(\)]+>/
        },
        {
          token: 'comment.line.number-sign',
          regex: /\s*`.+$/
        },
        {
          token: 'keyword.control',
          regex: /loop|endloop|to|in/
        },
        {
          token: 'support.function',
          regex: new RegExp(`\s*(${plugins.join('|')})`),
          caseInsensitive: true
        }
      ]

    };

  };

  oop.inherits(DecklangHighlightRules, TextHighlightRules);

  exports.DecklangHighlightRules = DecklangHighlightRules;
});