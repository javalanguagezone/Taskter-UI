import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

const routes: Routes = [
  {
    path: 'createProject',
    component: CreateProjectComponent
  },
  {
    path: 'createClient',
    component: CreateClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
