import { Component, Input, OnChanges, ViewChildren } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

import * as _ from 'lodash';

import * as domtoimage from 'dom-to-image';
import * as JSZip from 'jszip/dist/jszip.min.js';
import { saveAs } from 'file-saver';

import { CurrentProjectService } from '../current-project.service';
import { Project } from '../project.model';

import { DecklangParser } from '../../decklang/decklangparser';
import { DecklangState } from '../../decklang/decklangstate';

@Component({
  selector: 'app-create-results',
  templateUrl: './create-results.component.html',
  styleUrls: ['./create-results.component.scss']
})
export class CreateResultsComponent implements OnChanges {

  @LocalStorage()
  public hideResult: boolean;

  @Input()
  public project: Project;

  @Input()
  public projectId: string;

  @Input()
  public displayScript: string;

  @Input()
  public usePageStyle: boolean;

  @Input()
  public hideToolbar: boolean;

  @ViewChildren('gameCard')
  public gameCards: any[];

  private state: DecklangState = new DecklangState();
  public loading: boolean;

  public cardDisplayList: any = [];
  public showFront = true;
  public showBack = true;
  public isDownloading = false;

  private resourcePromises: Promise<any>[];

  constructor(private currentProjectService: CurrentProjectService) { }

  ngOnChanges(data) {
    if(data.usePageStyle) {
      this.setCardDisplay();
    }

    // don't render if the result window is hidden
    if(this.hideResult && !this.displayScript) return;

    this.resourcePromises = this.currentProjectService.loadResourcePromises(this.project);

    if(Object.keys(this.project.scripts || {}).length === 0) return;

    const currentScript = this.project.scripts[this.displayScript || this.project.activeScript];

    this.loading = true;

    // small delay so loading shows up
    setTimeout(() => this.renderScript(currentScript), 100);
  }

  handleError({ message }) {
    this.currentProjectService.errorMessage.next(message);
  }

  addPagePrintRules(state) {
    const PAGE_ID = '__page_rules';

    const oldPageStyle = document.getElementById(PAGE_ID);
    if(oldPageStyle) oldPageStyle.remove();

    const style = document.createElement('style');
    style.id = PAGE_ID;
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    const { page, card } = state.options;

    style.innerHTML = `
      @page {
        size: ${page.width} ${page.height};
        margin-top: calc(${page['margin-top']} - ${card['border-width']} / 2);
        margin-left: calc(${page['margin-left']} - ${card['border-width']} / 2);
        margin-right: calc(${page['margin-right']} - ${card['border-width']} / 2);
        margin-bottom: calc(${page['margin-bottom']} - ${card['border-width']} / 2);
      }

      @media print {
        body {
          min-width: 0px !important;
        }

        html, body, .results-pane {
          padding: 0;
          margin: 0 !important;
        }

        .container-fluid, .container {
          margin: 0;
        }

      }
    `;
  }

  parseCarddown() {
    const cards = this.state.internalState.getAllCards();

    cards.forEach(card => {
      card.texts.forEach(text => {
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

    replacers.forEach(replace => {
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

    front.forEach(card => card._front = true);
    back.forEach(card => card._back = true);

    // can't do this
    if(front.length !== back.length) {
      this.cardDisplayList = front;
      return;
    }

    const { cardsPerRow, rowsPerPage } = this.state.internalState.options.page.cardsPerPage;

    const cardsPerPage = this.usePageStyle ? cardsPerRow * rowsPerPage : 1;

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

  getScriptLineFromOffset(script, offset) {

    let currentLength = 0;
    let text = 'Unknown error';
    _.each(script.split('\n'), (line, index) => {

      if(offset <= line.length + currentLength) {
        text = `Syntax error on line ${index}: ${line}`;
        return false;
      }

      // +1 for the now-missing newline
      currentLength += line.length + 1;
    });

    return text;
  }

  renderScript(currentScript) {
    if(!currentScript) return;

    // no resources = insta-resolved promise
    const checkPromises = !this.project.resources
                        || _.size(this.project.resources) === 0 ? [new Promise(res => res())] : this.resourcePromises;

    Promise.all(checkPromises).then(values => {

      const defaultScope = {};
      values.forEach((res: any) => {
        if(!res) return;
        defaultScope[`resource:${res.name}`] = res.data || res.url;
      });

      const newState = this.state.newState();
      const newParser = new DecklangParser({ script: currentScript.contents });

      newParser.workerParse().then(instructions => {
        try {
          newParser.runInstructions(this.state, newState, instructions, defaultScope);
        } catch(e) {
          this.loading = false;
          this.handleError({ message: e.message });
          console.error(e);
          return;
        }

        this.state.internalState = newState;
        this.addPagePrintRules(newState);
        this.parseCarddown();
        this.setCardDisplay();
        this.loading = false;
        this.handleError({ message: 'No errors.' });
      }, (e) => {
        console.error(e);
        console.error('Error near', newParser.preParse().substring(e.offset - 5, e.offset + 5));
        this.loading = false;
        this.handleError({ message: this.getScriptLineFromOffset(currentScript.contents, e.offset) });
      });

    }, e => {
      this.loading = false;
      this.handleError({ message: e.message });
    });
  }

  public async downloadImages() {
    this.isDownloading = true;

    const scriptName = this.project.scripts[this.displayScript || this.project.activeScript].name;

    const zip = new JSZip();

    const gameCards = this.gameCards.map(x => x.nativeElement);
    let curIdx = 0;
    let curBack = 0;
    let curFront = 0;

    const convertPromises = [];

    gameCards.forEach(async value => {
      const cardRef = this.cardDisplayList[curIdx++];
      const imgStringPromise = domtoimage.toBlob(value);

      const num = cardRef._front ? curFront : curBack;

      if(cardRef._front) curFront++;
      else               curBack++;
      
      convertPromises.push(imgStringPromise);

      const imgString = await imgStringPromise;

      const front = zip.folder('front');
      const back = zip.folder('back');

      if(cardRef._front) front.file(`${num}.png`, imgString);
      else               back.file(`${num}.png`, imgString);

    });

    await Promise.all(convertPromises);

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${this.project.name}-${scriptName}-${Date.now()}.zip`);

    this.isDownloading = false;
  }

}
