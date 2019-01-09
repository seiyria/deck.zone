import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @LocalStorage()
  public authData: any;

  constructor(public afAuth: AngularFireAuth) {
    this.init();
  }

  public owns(project) {
    return (project && !project.owner) || this.authData && project && this.authData.uid === project.owner;
  }

  private init() {
    this.subscribe(authData => this.authData = authData);
  }

  public subscribe(fn) {
    this.afAuth.authState.subscribe(x => fn(x));
  }
}
