
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
    this.auth = auth;
  }

  getAllProjects(ownerUid) {
    return this.angularFire.list('/projects', {
      query: {
        orderByChild: 'owner',
        equalTo: ownerUid
      }
    });
  }

  createNewProject(project = {}) {
    const projects = this.angularFire.list('/projects');
    const newProjectData = _.cloneDeep(DefaultProject);

    if(this.auth.authData) {
      newProjectData.owner = this.auth.authData.uid;
    } else {
      newProjectData.owner = '';
    }

    if(project.projectId) {
      newProjectData.forkedFrom = project.projectId;
      project.name = `fork-${project.name}`;
    }

    newProjectData.name = _.truncate(project.name, { length: STRING_SIZES.projectName }) || hri.random();
    newProjectData.createdAt = Date.now();

    if(project.scripts && _.size(project.scripts) > 0) newProjectData.scripts = _.cloneDeep(project.scripts);
    if(project.resources && _.size(project.resources) > 0) newProjectData.resources = _.cloneDeep(project.resources);
    if(project.activeScript) newProjectData.activeScript = project.activeScript;

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

  getResourceList(id) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.list(`/projects/${id}/resources`);
  }

  getContent(id) {
    if(!id) {
      throw new Error('No id specified for project!');
    }

    return this.angularFire.object(`/projects/${id}`);
  }
}