
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

  formatMinutes(mins: number) {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `HH: ${h} MM: ${m}`;
  }


  getTotalTime() {
    return this.tasks.map(t => t.durationInMin).reduce(( acc, value ) => acc + value, 0);
  }

}
