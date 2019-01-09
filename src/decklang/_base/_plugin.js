
import _ from 'lodash';
import math from 'mathjs';

export class Plugin {
  static get helptext() { return 'help text'; }

  static resolveUnit(test, state) {
    return test || state.options.unit;
  }

  static combineForUnit({ val, unit }, state) {
    return `${val}${this.resolveUnit(unit, state)}`;
  }

  static operate(args, state, scope) {
    const keys = _.reject(_.keys(args), key => _.includes(['state', 'call'], key));

    _.each(keys, key => {
      const val = args[key];

      if(!val || _.isNumber(val) || _.isBoolean(val)) return;

      if(_.isString(val)) {
        args[key] = this.scopeString(val, scope);
        return;
      }

      if(val.eval) {
        args[key] = this.scopeEval(val.eval, scope);
        return;
      }

      if(val.val.eval) {
        args[key].val = this.scopeEval(val.val.eval, scope);
        return;
      }
    });

    args.state = _.cloneDeep(_.omit(state, 'cards'));
  }

  static replaceUrlVariables(string, scope) {
    const resourceRegex = /<<([\w:=-]+)>>/g;
    let res;
    const allReplaces = [];
    while((res = resourceRegex.exec(string))) {
      const expr = res[0];
      const val = `resource:${res[1]}`;
      allReplaces.push([expr, val]);
    }

    _.each(allReplaces, ([expr, val]) => {
      string = string.split(expr).join(scope[val]);
    });

    return string;
  }

  static scopeString(string, scope) {
    string = this.replaceUrlVariables(string, scope);

    const varReplaceRegex = /<[\w\s:=\+\/\*-]+>/g;
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

  static eval(obj, scope) {
    return obj && obj.eval ? this.scopeEval(obj.eval, scope) : obj;
  }

  static scopeEval(string, scope) {
    return math.eval(string, scope);
  }
}