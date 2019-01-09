import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { SwalComponent, SwalPartialTargets } from '@toverux/ngx-sweetalert2';

import { AuthService } from '../auth.service';
import { Project } from '../project.model';

const FILE_EXTENSION = '.deck';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss']
})
export class CreateSidebarComponent implements OnInit, OnDestroy {

  @Input()
  public projectId: string;
  
  @Input()
  public project: Project;

  @Input()
  public scriptList: any;

  @Input()
  public resourceList: any;

  // SCRIPT OUTPUT
  @Output()
  public activeScript = new EventEmitter();

  @Output()
  public newScript = new EventEmitter();

  @Output()
  public editScript = new EventEmitter();

  @Output()
  public deleteScript = new EventEmitter();

  // RESOURCE OUTPUT
  @Output()
  public newResource = new EventEmitter();

  @Output()
  public deleteResource = new EventEmitter();

  @ViewChild('editScriptSwal') 
  private editScriptSwal: SwalComponent;

  @ViewChild('deleteScriptSwal') 
  private deleteScriptSwal: SwalComponent;

  @ViewChild('deleteResourceSwal') 
  private deleteResourceSwal: SwalComponent;

  public isVisible = {};

  public scripts: any[];
  public validateScriptFilenameFn: Function;
  private scripts$: any;

  public newResourceName: string;
  public validateResourceNameFn: Function;
  public newResourceUrl: string;

  public resources: any[];
  private resources$: any;

  constructor(
    public readonly swalTargets: SwalPartialTargets,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.scripts$ = this.scriptList.snapshotChanges().pipe(map((items: any[]) => {
      return items.map(item => {
        return { $key: item.payload.key, ...item.payload.val() };
      });
    })).subscribe(scripts => {
      this.scripts = this.sortedScripts(scripts);
      this.validateScriptFilenameFn = this.validateScriptFilename.bind(this);

      if(!_.find(this.scripts, { activeScript: this.activeScript })) {
        this.activeScript.emit(this.scripts[0].$key);
      }
    });

    this.resources$ = this.resourceList.snapshotChanges().pipe(map((items: any[]) => {
      return items.map(item => {
        return { $key: item.payload.key, ...item.payload.val() };
      });
    })).subscribe(resources => {
      this.resources = this.sortedResources(resources);
      this.validateResourceNameFn = this.validateResourceName.bind(this);
    });
  }

  ngOnDestroy() {
    this.scripts$.unsubscribe();
    this.resources$.unsubscribe();
  }

  sortedScripts(scriptList) {
    return _(scriptList).keys().map(key => ({ $key: scriptList[key].$key, script: scriptList[key] })).sortBy(obj => obj.script.name).value();
  }

  sortedResources(resourceList) {
    return _(resourceList).keys().map(key => ({ $key: resourceList[key].$key, resource: resourceList[key] })).sortBy(obj => obj.resource.name).value();
  }

  // SCRIPT FUNCTIONS
  private cleanFilename(val): string {
    if(!val.endsWith(FILE_EXTENSION)) val = `${val}${FILE_EXTENSION}`;
    return val;
  }

  validateScriptFilename(value): boolean|string {
    const duplicateName = () => _.some(this.scripts, scriptObj => _.includes([value, `${value}${FILE_EXTENSION}`], scriptObj.script.name));
    if(!value)              return 'You need to give the file a name.';
    if(value.length > 20)   return 'File name limited to 20 characters.';
    if(duplicateName())     return 'You already have a file named that!';
  }

  addNewScript(scriptName: string) {
    this.newScript.emit(this.cleanFilename(scriptName));
  }

  async editScriptName(index: string) {
    const { value } = await this.editScriptSwal.show();
    if(!value) return;

    this.editScript.emit({ index, newName: this.cleanFilename(value) });
  }

  async deleteScriptFile(index: string) {
    const { value } = await this.deleteScriptSwal.show();
    if(!value) return;
    
    this.deleteScript.emit(index);
  }

  // RESOURCE FUNCTIONS
  validateResourceName(): boolean {
    return !this.validationNameResourceString();
  }

  validationNameResourceString(): string {
    const value = this.newResourceName;
    let error = '';

    const duplicateName = () => _.some(this.resources, resourceObj => resourceObj.resource.name === value);
    if(!value)                       error = 'You need to give the resource a name.';
    if(value && value.length > 20)   error = 'Resource name limited to 20 characters.';
    if(duplicateName())              error = 'You already have a resource named that!';

    if(error) {
      Swal.showValidationMessage(error);
      return error;
    }
  }

  addNewResource() {
    if(this.newResourceName && this.newResourceUrl) {
      this.newResource.emit({ name: this.newResourceName, url: this.newResourceUrl });
    }

    this.newResourceName = '';
    this.newResourceUrl = '';
  }

  async deleteResourceRef(index: string) {
    const { value } = await this.deleteResourceSwal.show();
    if(!value) return;

    this.deleteResource.emit(index);
  }

}
