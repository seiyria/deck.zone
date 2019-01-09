import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AceModule } from 'ngx-ace-wrapper';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { AuthService } from './auth.service';
import { CurrentProjectService } from './current-project.service';
import { TitleService } from './title.service';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { ExamplesComponent } from './examples/examples.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateComponent } from './create/create.component';
import { CreateContainerComponent } from './create-container/create-container.component';
import { CreateInvalidComponent } from './create-invalid/create-invalid.component';
import { CreateSettingsComponent } from './create-settings/create-settings.component';
import { CreateToolbarComponent } from './create-toolbar/create-toolbar.component';
import { CreateSidebarComponent } from './create-sidebar/create-sidebar.component';
import { CreateCreatorComponent } from './create-creator/create-creator.component';
import { CreateResultsComponent } from './create-results/create-results.component';
import { TextDirective, TextContainerDirective, ImageDirective, ShapeDirective } from './text.directive';

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    HomeComponent,
    HelpComponent,
    ContactComponent,
    ExamplesComponent,
    ProjectsComponent,
    CreateComponent,
    CreateContainerComponent,
    CreateInvalidComponent,
    CreateSettingsComponent,
    CreateToolbarComponent,
    CreateSidebarComponent,
    CreateCreatorComponent,
    CreateResultsComponent,
    TextDirective,
    TextContainerDirective,
    ImageDirective,
    ShapeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    NgxWebstorageModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AceModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    CurrentProjectService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
