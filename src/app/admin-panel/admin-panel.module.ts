import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';

import { EditBasicProjectInfoComponent } from './components/edit-basic-project-info/edit-basic-project-info.component';
import { EditProjectTasksComponent } from './components/edit-project-tasks/edit-project-tasks.component';

@NgModule({
  declarations: [
    CreateProjectComponent,
    CreateClientComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    EditBasicProjectInfoComponent,
    ClientsListComponent,
    EditProjectTasksComponent
  ],

  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [EditBasicProjectInfoComponent]
})
export class AdminPanelModule { }
