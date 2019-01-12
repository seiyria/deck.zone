import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CurrentProjectService } from '../current-project.service';
import { AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Project } from '../project.model';

@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.scss']
})
export class CreateContainerComponent implements OnInit {

  public api: any;

  public projectId: string;
  public project: Project;
  public projectData: AngularFireObject<any>;
  public scriptList: AngularFireList<any>;
  public resourceList: AngularFireList<any>;

  @LocalStorage()
  public hideResult: boolean;

  @LocalStorage()
  public hideSidebar: boolean;

  constructor(
    private router: Router, private route: ActivatedRoute, private auth: AuthService,
    private currentProjectService: CurrentProjectService
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    if(!this.projectId) {
      this.router.navigate(['../']);
      return;
    }

    this.projectData = this.currentProjectService.getContent(this.projectId);
    this.projectData.valueChanges().subscribe(value => {

      console.log(value, value.activeScriptId)

      this.project = value;

      const ownsProject = this.auth.owns(value);
      const isPrivate = value ? value.visibility === 'Private' : true;

      if(!value || (!ownsProject && isPrivate)) {
        return this.router.navigate(['create', this.projectId, '404']);
      }
    });

    this.scriptList = this.currentProjectService.getScriptList(this.projectId);
    this.resourceList = this.currentProjectService.getResourceList(this.projectId);

    this.api = {
      changeActiveScript: (index)               => {
        return this.projectData.update({ activeScript: index });
      },
      writeFile:          ({ contents, index }) => {
        const script = this.currentProjectService.getScript(this.projectId, index);
        return script.update({ contents });
      },
      newFile:            (name)                => this.scriptList.push({ name, contents: '' }),
      deleteFile:         (index)               => {
        const script = this.currentProjectService.getScript(this.projectId, index);
        return script.remove();
      },
      editFile:           ({ index, newName })  => {
        const script = this.currentProjectService.getScript(this.projectId, index);
        return script.update({ name: newName });
      },
      ownProject:         (newOwner)            => this.projectData.update({ owner: newOwner }),
      newResource:        (resource)            => this.resourceList.push(resource),
      deleteResource:     (index)               => {
        const res = this.currentProjectService.getResource(this.projectId, index);
        return res.remove();
      }
    };
  }

}
