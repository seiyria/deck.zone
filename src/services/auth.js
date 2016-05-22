
import { AngularFire } from 'angularfire2';

export class Auth {
  static get parameters() {
    return [[AngularFire]];
  }

  owns(project) {
    return (project && !project.owner) || this.authData && project && this.authData.uid === project.owner;
  }

  constructor(angularFire) {
    this.angularFire = angularFire;
    this.angularFire.auth.subscribe(auth => this.authData = auth);
  }

}