import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EditBasicProjectInfoComponent } from './components/edit-basic-project-info/edit-basic-project-info.component';

@NgModule({
  declarations: [
    CreateProjectComponent,
    CreateClientComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    EditBasicProjectInfoComponent
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
