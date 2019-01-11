
import { truncate } from 'lodash';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';
import { CurrentProjectService } from '../current-project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-create-settings',
  templateUrl: './create-settings.component.html',
  styleUrls: ['./create-settings.component.scss']
})
export class CreateSettingsComponent implements OnInit {

  private projectId: string;
  private projectData: any;
  public project: Project;

  public name: string;
  public visibility: string;

  constructor(
    private router: Router, private route: ActivatedRoute, private auth: AuthService,
    private currentProjectService: CurrentProjectService) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    if(!this.projectId) {
      this.router.navigate(['../']);
      return;
    }

    this.projectData = this.currentProjectService.getContent(this.projectId);
    this.projectData.valueChanges().subscribe(value => {

      if(!value) return;

      this.project = value;
      this.name = this.project.name;
      this.visibility = this.project.visibility || 'Public';

      const ownsProject = this.auth.owns(value);
      const isPrivate = value ? value.visibility === 'Private' : true;

      if(!value || (!ownsProject && isPrivate)) {
        return this.router.navigate(['create', this.projectId, '404']);
      }
    });
  }

  saveProject(formValue) {
    this.projectData.update({ visibility: formValue.visibility });
    this.projectData.update({ name: truncate(formValue.name, { length: 20 }) });
  }

  deleteProject() {
    this.projectData.remove();
    this.router.navigate(['/projects']);
  }

}
