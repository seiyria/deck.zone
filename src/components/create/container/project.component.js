
import Tabletop from 'tabletop';
import _ from 'lodash';

export class ProjectComponent {
  constructor() {
    this.internalProject = {};
  }

  ngOnChanges(data, loadResourcePromises = false) {
    if(!data.project) return;
    const changedProject = data.project.currentValue;
    if(!changedProject) return false;
    this.internalProject = changedProject;

    const refreshResources = !_.isEqual(this.lastResources, this.internalProject.resources);
    this.lastResources = _.cloneDeep(this.internalProject.resources);

    if(loadResourcePromises && refreshResources) this.loadResourcePromises();
    return true;
  }

  loadResourcePromises() {
    this.resourcePromises = _.map(_.values(this.internalProject.resources), rsc => {

      if(_.includes(rsc.url, 'docs.google.com/spreadsheet') && _.includes(rsc.url, 'pubhtml')) {
        return new Promise(resolve => {
          Tabletop.init({
            key: rsc.url,
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