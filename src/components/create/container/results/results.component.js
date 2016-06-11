
import { Component } from '@angular/core';
import template from './results.html';
import './results.less';
import { ProjectComponent } from '../project.component';

import { VsFor } from 'ng2-vs-for/src/ng2-vs-for';

import * as Components from '../../../../decklang/components/_components';

import _ from 'lodash';

import { StorageService } from 'ng2-storage';

import { DecklangParser } from '../../../../decklang/decklangparser';
import { DecklangState } from '../../../../decklang/decklangstate';

@Component({
  selector: 'results',
  providers: [StorageService],
  directives: [..._.values(Components), VsFor],
  inputs: ['project', 'projectId', 'displayScript', 'usePageStyle'],
  template
})
export class ResultsComponent extends ProjectComponent {

  static get parameters() {
    return [[StorageService]];
  }

  constructor(storage) {
    super();
    this.storage = storage.local;
    this.state = new DecklangState();
  }

  addPagePrintRules(state) {
    const PAGE_ID = '__page_rules';

    const oldPageStyle = document.getElementById(PAGE_ID);
    if(oldPageStyle) oldPageStyle.remove();

    const style = document.createElement('style');
    style.id = PAGE_ID;
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    const { page } = state.options;

    style.innerHTML = `
      @media print {
        html, body, .printable, .results-pane, .embed-view {
          width: ${page.width} !important;
          height: ${page.height} !important;
        }

        @page {
          size: ${page.width} ${page.height};
          margin-top: ${page['margin-top']};
          margin-left: ${page['margin-left']};
          margin-right: ${page['margin-right']};
          margin-bottom: ${page['margin-bottom']};
        }
      }
    `;
  }

  parseCarddown() {
    const cards = this.state.internalState.getAllCards();

    _.each(cards, card => {
      _.each(card.texts, text => {
        text.string = this.translateText(text.string);
      });
    });
  }

  translateText(string) {

    const replacers = [
      { regex: /((__|\*\*)([^_\*]+)(__|\*\*))/g,  tag: 'em' },
      { regex: /((_)([^_]+)(_))/g,                tag: 'u' },
      { regex: /((~)([^~]+)(~))/g,                tag: 'del' },
      { regex: /((\*)([^\*]+)(\*))/g,             tag: 'strong' }
    ];

    _.each(replacers, replace => {
      let regexResult = null;
      while ((regexResult = replace.regex.exec(string)) !== null) {
        string = string.split(regexResult[1]).join(`<${replace.tag}>${regexResult[3]}</${replace.tag}>`);
      }
    });

    return string;
  }

  setCardDisplay() {
    let { front, back } = this.state.internalState.cards;
    front = _.cloneDeep(front);
    back = _.cloneDeep(back);

    // can't do this
    if(front.length !== back.length) {
      this.cardDisplayList = front;
      return;
    }

    const { cardsPerRow, rowsPerPage } = this.state.internalState.options.page.cardsPerPage;

    const cardsPerPage = this.usePageStyle ? cardsPerRow*rowsPerPage : 1;

    const chunkSizePredicate = chunk => {
      if(cardsPerPage === 1) return chunk;
      const miniChunks = _.chunk(chunk, cardsPerRow);

      while(miniChunks.length < rowsPerPage) {
        const arr = [];
        for(let i = 0; i < cardsPerRow; i++) arr.push(this.state.internalState.newCard());
        miniChunks.push(arr);
      }
      _.each(miniChunks, miniChunk => {
        while(miniChunk.length < cardsPerRow) miniChunk.push(this.state.internalState.newCard());
      });

      return _.flatten(miniChunks);
    };

    const setPagebreak = chunk => chunk[chunk.length - 1]._pagebreak = true;

    const chunkedFront = _(front)
      .chunk(cardsPerPage)
      .map(chunkSizePredicate)
      .each(setPagebreak);

    const chunkedBack = _(back)
      .chunk(cardsPerPage)
      .map(chunkSizePredicate)
      .map(chunk => _.flatten(_.map(_.chunk(chunk, cardsPerRow), _.reverse)))
      .each(setPagebreak);

    this.cardDisplayList = _.flattenDeep(_.zip(chunkedFront, chunkedBack));
  }

  renderScript(currentScript) {
    if(!currentScript) return;


    Promise.all(this.resourcePromises).then(values => {

      const defaultScope = {};
      _.each(values, res => {
        defaultScope[`resource:${res.name}`] = res.data || res.url;
      });

      const newState = this.state.newState();
      const newParser = new DecklangParser({ script: currentScript.contents });

      try {
        const instructions = newParser.parse();

        newParser.runInstructions(this.state, newState, instructions, defaultScope);

        this.state.internalState = newState;
        this.addPagePrintRules(newState);
        this.parseCarddown();
        this.setCardDisplay();
        this.loading = false;

      } catch(e) {
        console.error(e);
        console.error('Error near', newParser.preParse().substring(e.offset - 5, e.offset + 5));
        this.loading = false;
      }
    });
  }

  ngOnChanges(data) {
    if(data.usePageStyle) {
      this.setCardDisplay();
    }

    const changed = super.ngOnChanges(data, true);
    if(!changed) return;

    // don't render if the result window is hidden
    if(this.storage.hideResult && !this.displayScript) return;

    const currentScript = this.internalProject.scripts[this.displayScript || this.internalProject.activeScript];

    this.loading = true;

    // small delay so loading shows up
    setTimeout(() => this.renderScript(currentScript), 100);
  }

}