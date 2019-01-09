import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { ExamplesComponent } from './examples/examples.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './create/create.component';
import { CreateContainerComponent } from './create-container/create-container.component';
import { CreateInvalidComponent } from './create-invalid/create-invalid.component';
import { CreateSettingsComponent } from './create-settings/create-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateComponent, children: [
    { path: '', redirectTo: '../home', pathMatch: 'full' },
    { path: ':projectId', component: CreateContainerComponent },
    { path: ':projectId/404', component: CreateInvalidComponent },
    { path: ':projectId/settings', component: CreateSettingsComponent }
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
