import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-claimer',
  templateUrl: './create-claimer.component.html',
  styleUrls: ['./create-claimer.component.scss']
})
export class CreateClaimerComponent implements OnInit {

  @Input()
  public project: Project;

  @Output()
  public claim = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  claimProject() {
    this.claim.emit(this.auth.authData.uid);
  }

}
