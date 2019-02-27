
import { Component, OnInit, Input } from '@angular/core';
import { ProjectTaskEntry } from '../../../shared/models/projectTaskEntry.model';
import { TimeEntryDialogueComponent } from '../time-entry-dialogue/time-entry-dialogue.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { TimesheetService } from '../../services/timesheet.service';

@Component({
  selector: 'tsk-time-sheet-table',
  templateUrl: './time-sheet-table.component.html',
  styleUrls: ['./time-sheet-table.component.scss']
})
export class TimeSheetTableComponent implements OnInit {

  @Input() tasks: ProjectTaskEntry[];
  @Input() date: moment.Moment;
  displayedColumns: string[] = ['Project Description', 'Duration', 'Action'];

  constructor(private dialogue: MatDialog, private timeSheetServices: TimesheetService,
    ) { }

  ngOnInit() {
  }

  getTotalTime() {
    return this.tasks.map(t => t.durationInMin).reduce(( acc, value ) => acc + value, 0);
  }

  getTaskByDate(year, month, day): void {
    this.timeSheetServices.getTasks(year, month, day)
      .subscribe(task => {
        this.tasks = task; }
      );
  }

  openDialog(id: number): void {
    const dialogueRef = this.dialogue.open(TimeEntryDialogueComponent, {
      width: '350px',
      data: {date: this.date, EntryId: id}
    });

    dialogueRef.afterClosed().subscribe(result => {
      this.getTaskByDate(this.date.year(), this.date.month() + 1, this.date.date());
    });
  }
}
