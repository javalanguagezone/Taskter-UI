import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { TimesheetComponent } from './timesheet.component';
import { TimeSheetRoutingModule } from './time-sheet-routing.module';
import { TimeSheetTableComponent } from './time-sheet-table/time-sheet-table.component';
import { TimeEntryDialogueComponent } from './time-entry-dialogue/time-entry-dialogue.component';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimesheetComponent, TimeSheetTableComponent, TimeEntryDialogueComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    TimeSheetRoutingModule,
    MatDialogModule,
    ReactiveFormsModule

  ],
  exports: [
    TimesheetComponent,
    TimeEntryDialogueComponent
  ],
  providers: [],
  entryComponents: [TimesheetComponent, TimeEntryDialogueComponent]
})
export class TimeSheetModule {}
