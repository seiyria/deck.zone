
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy, NgStyle } from '@angular/common';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { FontAwesomeDirective } from 'ng2-fontawesome';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig } from 'angularfire2';

import { App } from './components/app.component';
import { TitleChangerService } from './services/titlechanger';
import { Auth } from './services/auth';
import { StorageSettings } from 'ng2-storage';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/components/tooltip';

bootstrap(App, [
  Title,
  TitleChangerService,
  NgStyle,
  Auth,
  provide(PLATFORM_DIRECTIVES, { useValue: TOOLTIP_DIRECTIVES, multi: true }),
  provide(StorageSettings, { useValue: { prefix: 'dz' } }),
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
  defaultFirebase('https://deckzone.firebaseio.com'),
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);