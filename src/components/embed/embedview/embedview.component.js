
import { Component } from '@angular/core';
import { RouteParams, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ResultsComponent } from '../../create/container/results/results.component';

import { AceEditorDirective } from 'ng2-ace';

import { CurrentProjectService } from '../../../services/currentproject';

import './embedview.less';
import template from './embedview.html';

@Component({
  template,
  providers: [CurrentProjectService],
  directives: [AceEditorDirective, ResultsComponent, ROUTER_DIRECTIVES]
})
export class EmbedViewComponent {

  static get parameters() {
    return [[RouteParams], [Router], [CurrentProjectService]]
  }

  constructor(routeParams, router, currentProjectService) {
    const { projectId, scriptId, tabs } = routeParams.params;
    this.projectId = projectId;
    this.scriptId = scriptId;
    this.tabs = tabs.split(',');

    if (!this.projectId || !this.scriptId || !tabs) {

      // TODO show 404 info (include information about possible misconfiguration)
      return router.navigate(['/Home']);
    }

    this.projectData = currentProjectService.getContent(this.projectId);
    this.projectData._ref.on('value', snap => {
      const value = snap.val();
      if(value) return;

      // TODO check for private project

      // TODO show 404 info
    });

    this.activeTab = this.tabs[0];
  }

}