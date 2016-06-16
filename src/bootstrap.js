
import 'reflect-metadata';
import 'zone.js/dist/zone';

import 'bootstrap/dist/css/bootstrap.css';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { NgStyle } from '@angular/common';
import { provide, PLATFORM_DIRECTIVES, enableProdMode } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { FontAwesomeDirective } from 'ng2-fontawesome';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { App } from './components/app.component';
import { TitleChangerService } from './services/titlechanger';
import { Auth } from './services/auth';
import { StorageSettings } from 'ng2-storage';
import { TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/components/tooltip';

if(window.location.hostname !== 'localhost') enableProdMode();

bootstrap(App, [
  Title,
  TitleChangerService,
  NgStyle,
  Auth,
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  provide(StorageSettings, { useValue: { prefix: 'dz' } }),
  provide(PLATFORM_DIRECTIVES, { useValue: TOOLTIP_DIRECTIVES, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: FontAwesomeDirective, multi: true }),
  defaultFirebase('https://deckzone.firebaseio.com')
]);