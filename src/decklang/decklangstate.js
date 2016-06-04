
import * as Plugins from './plugins/_plugins';

import _ from 'lodash';

const PLUGINS = _.mapKeys(Plugins, (value, key) => key.toLowerCase());

const defaultState = {
  font: {
    family: 'Arial',
    size: 10,
    unit: 'pt',
    color: '#000',
    decoration: ''
  },
  unit: 'cm',
  page: {
    cardsPerPage: 9,
    width: '8.5in',
    height: '11in',
    'margin-top': 0,
    'margin-left': 0,
    'margin-right': 0,
    'margin-bottom': 0
  },
  card: {
    width: '6cm',
    height: '9cm',
    'margin-top': 0,
    'margin-left': 0,
    'margin-right': 0,
    'margin-bottom': 0,
    'border-style': 'none',
    'border-width': '1px',
    'border-color': '#000'
  }
};

class InternalState {
  constructor() {
    this.cards = [];
    this.options = _.cloneDeep(defaultState);
  }

  newCard() {
    return { texts: [] };
  }
}

export class DecklangState {

  constructor() {
    this.internalState = this.newState();
  }

  newState() {
    return new InternalState();
  }

  runPlugin(state, plugin, scope = {}) {
    if(!PLUGINS[plugin.call]) throw new Error(`Plugin '${plugin.call}' does not exist.`);
    PLUGINS[plugin.call].operate(plugin, state, scope);
  }
}