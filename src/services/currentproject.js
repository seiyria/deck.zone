
import { AngularFire, FirebaseObjectFactory } from 'angularfire2';
import { Observable } from 'rxjs';
import { DefaultProject } from '../constants/defaultproject';
import _ from 'lodash';

export class CurrentProjectService {
  static get parameters() {
    return [[AngularFire]];
  }

  constructor(angularFire) {
    this.angularFire = angularFire;
  }

  createNewProject() {
    const projects = this.angularFire.list('/projects');
    const newProject = projects.push(_.cloneDeep(DefaultProject));

    const split = newProject.toString().split('/');
    return split[split.length-1];
  }

  getScriptList(id) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.list(`/projects/${id}/scripts`);
  }

  getContent(id) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.object(`/projects/${id}`);
  }
}