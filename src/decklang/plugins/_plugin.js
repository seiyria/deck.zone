
import _ from 'lodash';

export class Plugin {
  static get helptext() { return 'help text'; }
  static operate(args, state) {
    args.state = _.cloneDeep(state);
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