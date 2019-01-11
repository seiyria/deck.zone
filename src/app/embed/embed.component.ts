
import { includes } from 'lodash';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CurrentProjectService } from '../current-project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss']
})
export class EmbedComponent implements OnInit {

  public isBad: boolean;
  public projectId: string;
  public scriptId: string;
  public tabs: string[];
  public print: string;

  public isMisconfigured: boolean;
  public isPrivate: boolean;
  public is404: boolean;

  public showPrint: boolean;
  public activeTab: string;
  public printStyles: boolean;
  public inIframe: boolean;

  public scriptName: string;
  public projectData: any;
  public project: Project;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private currentProjectService: CurrentProjectService
  ) { }

  ngOnInit() {
    this.inIframe = window.self !== window.top;

    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.scriptId = this.route.snapshot.paramMap.get('scriptId');
    this.tabs = (this.route.snapshot.paramMap.get('tabs') || '').split(',');
    this.print = this.route.snapshot.paramMap.get('print');

    this.activeTab = this.tabs[0];
    this.showPrint = includes(this.tabs, 'result') && !this.inIframe;

    if(!this.projectId || !this.scriptId || !this.tabs || !this.tabs.length || !this.tabs[0]) {
      this.markBad('isMisconfigured');
      return;
    }

    if(!this.projectId) {
      this.router.navigate(['../']);
      return;
    }

    this.projectData = this.currentProjectService.getContent(this.projectId);
    this.projectData.valueChanges().subscribe(value => {
      if(!value) {
        this.markBad('is404');
        return;
      }

      if(value.visibility === 'Private') {
        this.markBad('isPrivate');
        return; 
      }

      if(!value.scripts[this.scriptId]) {
        this.markBad('isMisconfigured');
        return;
      }

      this.project = value;

      this.scriptName = value.scripts[this.scriptId].name;
    });
  }

  markBad(reason) {
    this.isBad = true;
    this[reason] = true;
  }
}
