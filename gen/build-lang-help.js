const _ = require('lodash');
const ParserRules = require('../src/decklang/decklang').ParserRules;
const plugins = require('../src/decklang/plugins.json');

const secondaryUnits = [
  'BorderStyle',
  'CardSide',
  'CardSize',
  'CssUnit',
  'PaperSize',
  'HorizontalAlignment',
  'TextDecoration',
  'VerticalAlignment'
];

const directiveRules = [];
const secondaryRules = [];

const aliases = {
  PositiveCssVariable: 'CssValue',
  PositiveCssValue: 'CssValue',
  PositiveIntegerVariable: 'PositiveInteger',
  String: '"Text"'
};

const parseSymbol = (symbol) => {
  if(_.isRegExp(symbol)) {
    const str = symbol.toString().split('/')[1];
    return str.substring(1, str.length - 1).split('').join(',');
  }
  if(_.includes(symbol, '_')) return '';
  if(_.includes(symbol, '$')) return _.flatten(literals(_.filter(ParserRules, { name: symbol })));
  if(symbol.literal) return symbol.literal;
  if(aliases[symbol]) return aliases[symbol];
  return symbol;
};

const literals = (rules) => {
  return _.map(rules, rule => {
    if(rule.symbols.length === 0) return [];
    return _.map(rule.symbols, symbol => {
      if(symbol === rule.name) return '';
      return parseSymbol(symbol);
    });
  });
};

const stringArrayToRules = (sourceArray, destArray) => {

  // get the relevant data
  _.each(sourceArray, plugin => {
    const allRulesInGrammar = _(ParserRules)
      .filter(rule => rule.name === plugin)
      .map(ruleData => ({ name: ruleData.name, symbols: ruleData.symbols }))
      .value();

    _.each(allRulesInGrammar, rule => destArray.push(rule));
  });

  // get the deepest parse of every rule
  _.each(destArray, rule => {
    rule.symbols = _.compact(_.map(rule.symbols, parseSymbol));
  });

  // cleanup
  _.each(destArray, rule => {
    rule.symbols = _.map(rule.symbols, symbol => {
      if(_.isArray(symbol)) return symbol.join('');
      return symbol;
    });
  });
};

stringArrayToRules(plugins, directiveRules);
stringArrayToRules(secondaryUnits, secondaryRules);

const groupedDirectives = _.groupBy(directiveRules, 'name');
const groupedSecondaries = _.groupBy(secondaryRules, 'name');

const finalDirectives = _.reduce(_.keys(groupedDirectives), (prev, cur) => {
  prev[cur] = _.map(groupedDirectives[cur], directive => {
    const newSymbols = _.compact(_.map(directive.symbols, (symbol, index) => {

      if(symbol === ',') return null;

      const obj = { str: '' };

      if(_.includes(symbol, ',,,,')) {
        obj.str = symbol.replace(/,/gm, '');
        obj.optional = true;
      } else {
        obj.str = symbol;
      }

      obj.commaBefore = index > 2;
      obj.hasMore = !!groupedSecondaries[obj.str];

      return obj;
    }));

    return newSymbols;

  });
  return prev;
}, {});



const secondaryStrings = _.reduce(_.keys(groupedSecondaries), (prev, cur) => {
  prev[cur] = _.map(groupedSecondaries[cur], sec => {
    if(_.isEmpty(sec.symbols)) return 'empty';
    return _.map(sec.symbols, sym => sym ? sym : 'empty').join(' ');
  }).join(' | ');
  return prev;
}, {});

const object = {
  directives: finalDirectives,
  secondarys: secondaryStrings
};

console.log(JSON.stringify(object, null, 4));
