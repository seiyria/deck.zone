
import _ from 'lodash';
import math from 'mathjs';

export class Plugin {
  static get helptext() { return 'help text'; }

  static resolveUnit(test, state) {
    return test || state.options.font;
  }

  static operate(args, state, scope) {

    const keys = _.reject(_.keys(args), key => _.includes(['state', 'call'], key));

    _.each(keys, key => {
      const val = args[key];

      if(!val) return;
      if(_.isString(val)) args[key] = this.scopeString(val, scope);
      if(val.eval)        args[key] = this.scopeEval(val.eval, scope);
    });

    args.state = _.cloneDeep(_.omit(state, 'cards'));
  }

  static scopeString(string, scope) {
    const varReplaceRegex = /<[\w\s=\+\/\*-]+>/g;
    let res;
    const allReplaces = [];
    while((res = varReplaceRegex.exec(string))) {
      const expr = res[0];
      const val = expr.substring(1, expr.length - 1);
      allReplaces.push([expr, val]);
    }

    _.each(allReplaces, ([expr, val]) => {
      string = string.split(expr).join(math.eval(val, scope));
    });

    return string;
  }

  static scopeEval(string, scope) {
    return math.eval(string, scope);
  }
}

export class PluginComponent {

  constructor() {}

  setStyle() { this.style(); }

  style() {
    return {};
  }

  ngOnChanges() {
    this.setStyle();
  }

}