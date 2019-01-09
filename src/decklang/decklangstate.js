
import * as Plugins from './plugins/_plugins';

import _ from 'lodash';

export const PLUGINS = _.mapKeys(Plugins, (value, key) => key.toLowerCase());

const defaultState = {
  unit: 'cm',
  cardside: 'front',
  font: {
    family: 'Arial',
    size: 10,
    unit: 'pt',
    color: '#000',
    decoration: ''
  },
  page: {
    cardsPerPage: { cardsPerRow: 3, rowsPerPage: 3 },
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
    // 'outline-offset': '-1px',
    'border-style': 'none',
    'border-width': '1px',
    'border-color': '#000'
  }
};

class InternalState {
  constructor() {
    this.cards = {
      front: [],
      back: []
    };
    this.options = _.cloneDeep(defaultState);
  }

  getCard(index) {
    let card = this.cards[this.options.cardside][index];
    if(!card) {
      card = this.cards[this.options.cardside][index] = this.newCard();
    }

    return card;
  }

  getCurrentCardFrontAndBack() {
    const cardFronts = this.cards.front;
    const cardBacks = this.cards.back;

    let frontCard = _.last(cardFronts);
    if(!frontCard || cardFronts.length < cardBacks.length) {
      frontCard = this.newCard();
      cardFronts.push(frontCard);
    }

    let backCard = _.last(cardBacks);
    if(!backCard || cardBacks.length < cardFronts.length) {
      backCard = this.newCard();
      cardBacks.push(backCard);
    }
    return [frontCard, backCard];
  }

  getAllCards() {
    return this.cards.front.concat(this.cards.back);
  }

  newCard() {
    return { texts: [], images: [], shapes: [], _cardrender: true };
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