
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { FontAwesomeDirective } from 'ng2-fontawesome';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig } from 'angularfire2';

import { App } from './components/app.component';
import { TitleChangerService } from './services/titlechanger';
import { StorageSettings } from 'ng2-storage';

bootstrap(App, [
  Title,
  TitleChangerService,
  provide(StorageSettings, { useValue: { prefix: 'dz' } }),
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
  defaultFirebase('https://deckzone.firebaseio.com'),
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);