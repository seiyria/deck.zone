
import _ from 'lodash';
import math from 'mathjs';

export class Plugin {
  static get helptext() { return 'help text'; }
  static operate(args, state, scope) {

    const keys = _.keys(args);
    _.each(keys, key => {
      if(_.isString(args[key])) args[key] = this.scopeString(args[key], scope);
      if(args[key].eval) args[key] = this.scopeEval(args[key].eval, scope);
    });
    args.state = _.cloneDeep(state);
  }

  static scopeString(string, scope) {
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