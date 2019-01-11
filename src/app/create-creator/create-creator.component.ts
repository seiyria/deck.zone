import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChildren, OnDestroy } from '@angular/core';
import { Project } from '../project.model';

import * as _ from 'lodash';

import { map } from 'rxjs/operators';

import '../../decklang/ace/ace';
import { PLUGINS } from '../../decklang/decklangstate';
import { AuthService } from '../auth.service';
import { CurrentProjectService } from '../current-project.service';
import { AceComponent } from 'ngx-ace-wrapper';

@Component({
  selector: 'app-create-creator',
  templateUrl: './create-creator.component.html',
  styleUrls: ['./create-creator.component.scss']
})
export class CreateCreatorComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public project: Project;

  @Input()
  public projectId: string;

  @Input()
  public scriptList: any;

  @Output()
  public updateFile = new EventEmitter();

  @ViewChildren(AceComponent)
  public componentRefs: AceComponent[];

  public scripts: any[];
  public scripts$: any;

  public activeScriptId: string;

  public oldFileCount: number;
  public editors = {};
  public editorOptions = {
    printMargin: false,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  };

  public editorCbs = {};
  public currentLine = new EventEmitter();
  public help: string;

  public errorMessage: string;
  public errorMessage$: any;

  public saveFileFn: Function = _.debounce((contents, index) => {
    this.updateFile.emit({ contents, index });
    window.onbeforeunload = () => null;
  }, 5000);

  constructor(public authService: AuthService, private currentProjectService: CurrentProjectService) { }

  ngOnInit() {
    this.errorMessage = 'No errors.';

    this.scripts$ = this.scriptList.snapshotChanges().pipe(map((items: any[]) => {
      return items.map(item => {
        return { $key: item.payload.key, ...item.payload.val() };
      });
    })).subscribe(scripts => {
      this.scripts = scripts;
      setTimeout(() => this.updateAceInstances(), 0);
    });

    this.errorMessage$ = this.currentProjectService.errorMessage.subscribe(val => this.errorMessage = val);

    this.currentLine.subscribe(val => this.help = this.directiveHelp(val));
  }

  ngOnDestroy() {
    this.scripts$.unsubscribe();
    this.errorMessage$.unsubscribe();
  }

  ngOnChanges(data) {
    const projectData = data.project.currentValue;
    if(!projectData) return;

    this.activeScriptId = projectData.activeScript;

    // don't refresh view if just text changes
    const numFiles = Object.keys(projectData.scripts || {}).length;
    if(numFiles === this.oldFileCount) return;
    this.oldFileCount = numFiles;
  }

  public updateAceInstances() {
    this.componentRefs.forEach((ref, i) => {
      this.addEditor(ref.directiveRef.ace(), this.scripts[i].$key);
    });
  }

  public onChange(contents, index) {
    this.saveFileFn(_.trimEnd(contents), index);
    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = 'Your work is not done syncing yet. Are you sure you want to close the page?';
    };
  }

  public addEditor(editor, id) {
    if(this.editorCbs[id]) editor.off('changeSelection', this.editorCbs[id]);

    const fn = () => {
      const startRow = editor.getSelectionRange().start.row;
      const fullLine = editor.session.getLine(startRow);
      this.currentLine.next(fullLine);
    };

    editor.on('changeSelection', fn);
    this.editorCbs[id] = fn;
  }

  private directiveHelp(line) {
    const directive = line.split('=')[0].split('`').join('').trim();
    if(_.includes(directive, '[') || !directive || !_.includes(line, '=')) return '';
    const plugin = PLUGINS[directive];
    if(!plugin) return `No help available for ${directive}.`;
    return plugin.help;
  }

}
