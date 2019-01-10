import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialDesignModule} from '../shared/material-design/material-design.module';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [
    TimesheetComponent

  ]
})
export class TimeSheetModule {

  
 }
