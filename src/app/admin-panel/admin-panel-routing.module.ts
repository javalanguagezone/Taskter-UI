import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  {
    path: 'createProject',
    component: CreateProjectComponent
  },
  {
    path: 'createClient',
    component: CreateClientComponent
  },
  {
    path: 'projects',
    component: ProjectsListComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
