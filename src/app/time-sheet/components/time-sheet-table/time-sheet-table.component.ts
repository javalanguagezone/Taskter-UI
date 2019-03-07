
import { Component, OnInit, Input } from '@angular/core';
import { ProjectTaskEntry } from '../../../shared/models/projectTaskEntry.model';
import { TimeEntryDialogueComponent } from '../time-entry-dialogue/time-entry-dialogue.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'tsk-time-sheet-table',
  templateUrl: './time-sheet-table.component.html',
  styleUrls: ['./time-sheet-table.component.scss']
})
export class TimeSheetTableComponent implements OnInit {

  @Input() tasks: ProjectTaskEntry[];
  displayedColumns: string[] = ['Project Description', 'Duration', 'Action'];

  constructor(private dialogue: MatDialog) { }

  ngOnInit() {
  }

  getTotalTime() {
    return this.tasks.map(t => t.durationInMin).reduce(( acc, value ) => acc + value, 0);
  }


  openDialog(id: number): void {
    const dialogueRef = this.dialogue.open(TimeEntryDialogueComponent, {
      width: '350px',
      data: {date: null, EntryId: id}
    });

  }
}
