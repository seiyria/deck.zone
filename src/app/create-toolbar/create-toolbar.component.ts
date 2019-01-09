import { Component, OnInit, Input } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Project } from '../project.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-toolbar',
  templateUrl: './create-toolbar.component.html',
  styleUrls: ['./create-toolbar.component.scss']
})
export class CreateToolbarComponent implements OnInit {

  @Input()
  public projectId: string;

  @Input()
  public project: Project;

  @LocalStorage()
  public hideResult: boolean;

  @LocalStorage()
  public hideSidebar: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
