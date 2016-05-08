
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { LocationStrategy, HashLocationStrategy } from 'angular2/platform/common';
import { provide } from 'angular2/core';

import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig } from 'angularfire2';

import { bootstrap } from 'angular2/platform/browser';
import { App } from './components/app.component';
bootstrap(App, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://deckzone.firebaseio.com'),
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);