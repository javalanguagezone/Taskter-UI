
import { Component, OnInit, Input } from '@angular/core';
import { ProjectTaskEntry } from 'src/app/services/timesheet.service';

@Component({
  selector: 'tsk-time-sheet-table',
  templateUrl: './time-sheet-table.component.html',
  styleUrls: ['./time-sheet-table.component.scss']
})
export class TimeSheetTableComponent implements OnInit {

  @Input() tasks: ProjectTaskEntry[];
  displayedColumns: string[] = ['Project Description', 'Duration', 'Action'];

  constructor() { }

  ngOnInit() {
  }




  getTotalTime() {
    return this.tasks.map(t => t.durationInMin).reduce(( acc, value ) => acc + value, 0);
  }

}
