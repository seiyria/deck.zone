import { Component, OnInit } from '@angular/core';
import { CurrentProjectService } from '../current-project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projectName: string;

  public loadedProjects: boolean;
  public projects: Observable<any>;

  constructor(
    private router: Router,
    private authService: AuthService, 
    private currentProjectService: CurrentProjectService
    ) { }

  ngOnInit() {
    this.loadedProjects = false;

    this.authService.subscribe(authData => {
      const projects = this.currentProjectService.getAllProjects(authData.uid);
      this.projects = projects.snapshotChanges().pipe(map(items => {
        return items.map(item => {
          return { $key: item.payload.key, ...item.payload.val() };
        });
      }));
      
      this.loadedProjects = true;
    });
  }

  createProject(name) {
    const id = this.currentProjectService.createNewProject({ name });
    this.router.navigate(['/create', id]);
  }

  public size(ref) {
    return Object.keys(ref || {}).length;
  }

  public firstScriptName(scripts) {
    const firstKey = Object.keys(scripts || {})[0];
    if(!firstKey) return '';
    return scripts[firstKey].name;
  }

}
