import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import Tabletop from 'tabletop/src/tabletop.js';

import { size, truncate, cloneDeep, values, includes } from 'lodash';
import { hri } from 'human-readable-ids';

import { Project, Resource, Script } from './project.model';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

interface ProjectOpts {
  name?: string;
  projectId?: string;
  scripts?: Script[];
  resources?: Resource[];
  activeScript?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentProjectService {

  constructor(private auth: AuthService, private angularFire: AngularFireDatabase) { }

  public errorMessage = new Subject<string>();

  getAllProjects(ownerUid: string) {
    return this.angularFire.list('/projects', ref => ref.orderByChild('owner').equalTo(ownerUid));
  }

  createNewProject(projectOpts: ProjectOpts = {}) {
    const projects = this.angularFire.list('/projects');
    const newProjectData = new Project();

    if(this.auth.authData) {
      newProjectData.owner = this.auth.authData.uid;
    } else {
      newProjectData.owner = '';
    }

    if(projectOpts.projectId) {
      newProjectData.forkedFrom = projectOpts.projectId;
      projectOpts.name = `fork-${projectOpts.name}`;
    }

    newProjectData.name = truncate(projectOpts.name, { length: 30 }) || hri.random();
    newProjectData.createdAt = Date.now();

    if(projectOpts.scripts && size(projectOpts.scripts) > 0) newProjectData.scripts = cloneDeep(projectOpts.scripts);
    if(projectOpts.resources && size(projectOpts.resources) > 0) newProjectData.resources = cloneDeep(projectOpts.resources);
    if(projectOpts.activeScript) newProjectData.activeScript = projectOpts.activeScript;

    const newProject = projects.push(newProjectData);

    const split = newProject.toString().split('/');
    return split[split.length - 1];
  }

  getScriptList(id: string) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.list(`/projects/${id}/scripts`);
  }

  getScript(id: string, scriptId: string) {
    if(!id || !scriptId) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.object(`/projects/${id}/scripts/${scriptId}`);
  }

  getResourceList(id: string) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.list(`/projects/${id}/resources`);
  }

  getResource(id: string, resourceId: string) {
    if(!id || !resourceId) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.list(`/projects/${id}/resources/${resourceId}`);
  }

  getContent(id: string) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.object(`/projects/${id}`);
  }

  public loadResourcePromises(project: Project) {
    return values(project.resources).map(rsc => {

      if(includes(rsc.url, 'docs.google.com/spreadsheet') && includes(rsc.url, 'sharing')) {
        return new Promise(resolve => {
          Tabletop.init({
            key: rsc.url,
            parseNumbers: true,
            callback: (data) => {
              rsc.data = data;
              resolve(rsc);
            }
          });
        });
      }

      return new Promise(resolve => resolve(rsc));
    });
  }
}
