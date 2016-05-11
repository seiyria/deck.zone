
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';

import { FontAwesomeDirective } from 'ng2-fontawesome';

import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig } from 'angularfire2';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from './components/app.component';

bootstrap(App, [
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
  defaultFirebase('https://deckzone.firebaseio.com'),
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);