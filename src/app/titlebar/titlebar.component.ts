import { includes } from 'lodash';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { CurrentProjectService } from '../current-project.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  public showSelf = true;
  public authTypes = ['Facebook', 'Google'];

  constructor(
    private router: Router, 
    public authService: AuthService, 
    private currentProjectService: CurrentProjectService
  ) { }

  ngOnInit() {
    this.showSelf = !includes(location.href, 'embed');
  }

  login(type: string) {
    this.authService.afAuth.auth.signInWithPopup(new auth[`${type}AuthProvider`]());
  }

  logout() {
    this.router.navigate(['']);
    this.authService.afAuth.auth.signOut();
  }

  createProject() {
    const id = this.currentProjectService.createNewProject();
    this.router.navigate(['/create', id]);
  }

  hasRouteActive(route: string): boolean {
    return includes(location.href, route);
  }

}
