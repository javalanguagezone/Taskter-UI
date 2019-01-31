import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { TimesheetComponent } from './components/time-sheet/timesheet.component';
import { TimeSheetRoutingModule } from './time-sheet-routing.module';
import { TimeSheetTableComponent } from './components/time-sheet-table/time-sheet-table.component';
import { TimeEntryDialogueComponent } from './components/time-entry-dialogue/time-entry-dialogue.component';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatMinutesPipe } from './pipes/format-minutes.pipe';

@NgModule({
  declarations: [TimesheetComponent, TimeSheetTableComponent, TimeEntryDialogueComponent, FormatMinutesPipe],
  imports: [
    CommonModule,
    MaterialDesignModule,
    TimeSheetRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TimesheetComponent,
    TimeEntryDialogueComponent,
    FormatMinutesPipe
  ],
  providers: [],
  entryComponents: [TimesheetComponent, TimeEntryDialogueComponent]
})
export class TimeSheetModule {}
