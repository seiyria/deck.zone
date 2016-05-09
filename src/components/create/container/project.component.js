
import { EventEmitter } from '@angular/core';

export class ProjectComponent {
  constructor() {
    this.internalProject = {};
  }

  ngOnChanges(data) {
    const changedProject = data.project.currentValue;
    if(!changedProject) return;
    this.internalProject = changedProject;
  }
}