
import { Component, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { window } from '@angular/platform-browser/src/facade/browser';

import template from './creator.html';
import './creator.less';
import { ProjectComponent } from '../project.component';

import { AceEditorDirective } from 'ng2-ace';

import '../../../../decklang/ace/ace';
import { PLUGINS } from '../../../../decklang/decklangstate';

import { Auth } from '../../../../services/auth';

import _ from 'lodash';

@Component({
  selector: 'creator',
  inputs: ['projectId', 'project', 'api', 'parserErrorHandler'],
  directives: [AceEditorDirective, NgClass],
  template
})
export class CreatorComponent extends ProjectComponent {

  static get parameters() {
    return [[Auth]];
  }

  ngOnInit() {
    this.parserErrorHandler.subscribe(args => {
      this.error = args.message;
    });
  }

  constructor(auth) {
    super();

    this.auth = auth;
    this.editors = {};
    this.currentLineEmitter = new EventEmitter();
    this.currentLineEmitter.subscribe(val => this.help = this.directiveHelp(val));

    this.error = 'No errors.';

    const writeFile = _.debounce((data, index) => {
      this.api.writeFile(data, index);
      window.onbeforeunload = () => null;
    }, 5000);

    this.onChange = (data, index) => {
      writeFile(_.trimEnd(data), index);
      window.onbeforeunload = () => 'Your work is not done syncing yet. Are you sure you want to close the page?';
    };

    this.setEditor = (editor, index) => {
      this.editors[index] = editor;
      editor.on('changeSelection', () => {
        const startRow = editor.getSelectionRange().start.row;
        const fullLine = editor.session.getLine(startRow);
        this.currentLineEmitter.next(fullLine);
      });
    };

    this.editorOptions = {
      printMargin: false,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    };
  }

  directiveHelp(line) {
    const directive = line.split('=')[0].trim();
    if(_.includes(directive, '[') || !directive || !_.includes(line, '=')) return '';
    const plugin = PLUGINS[directive];
    if(!plugin) return `No help available for ${directive}.`;
    return plugin.help;
  }

  ngOnChanges(data) {
    const projectData = data.project.currentValue;
    if(!projectData) return;

    this.activeScriptId = projectData.activeScript;

    // don't refresh view if just text changes
    const numFiles = _.keys(projectData.scripts).length;
    if(numFiles === this.oldFileCount) return;
    this.oldFileCount = numFiles;

    super.ngOnChanges(data);
    this._scriptList = _(this.internalProject.scripts).keys().map(key => ({ key, script: this.internalProject.scripts[key] })).value();
  }

}