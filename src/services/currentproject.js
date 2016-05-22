
import { AngularFire } from 'angularfire2';
import { DefaultProject, STRING_SIZES } from '../constants/defaultproject';
import { Auth } from '../services/auth';
import _ from 'lodash';

import { hri } from 'human-readable-ids';

export class CurrentProjectService {
  static get parameters() {
    return [[AngularFire], [Auth]];
  }

  constructor(angularFire, auth) {
    this.angularFire = angularFire;
    this.authData = auth.authData;
  }

  createNewProject({ name } = {}) {
    const projects = this.angularFire.list('/projects');
    const newProjectData = _.cloneDeep(DefaultProject);
    if(this.authData) {
      newProjectData.owner = this.authData.uid;
    }

    newProjectData.name = _.truncate(name, { length: STRING_SIZES.projectName }) || hri.random();
    newProjectData.createdAt = Date.now();

    const newProject = projects.push(newProjectData);

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