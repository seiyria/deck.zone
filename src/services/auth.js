
import { AngularFire } from 'angularfire2';

export class Auth {
  static get parameters() {
    return [[AngularFire]];
  }

  owns(project) {
    return (project && !project.owner) || this.authData && project && this.authData.uid === project.owner;
  }

  subscribe(callback) {
    this.angularFire.auth.subscribe(callback);
  }

  constructor(angularFire) {
    this.angularFire = angularFire;
    this.subscribe(auth => this.authData = auth);
  }

}