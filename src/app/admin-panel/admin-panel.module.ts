import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateProjectComponent } from './components/create-project/create-project.component';

@NgModule({
  declarations: [CreateProjectComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
