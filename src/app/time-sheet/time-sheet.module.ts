import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { TimesheetComponent } from './timesheet.component';
import { TimeSheetRoutingModule } from './time-sheet-routing.module';


@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    TimeSheetRoutingModule
  ],
  exports: [
    TimesheetComponent
  ]
})
export class TimeSheetModule {}
