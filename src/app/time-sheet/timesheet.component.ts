import { Component, OnInit } from '@angular/core';
import { TimesheetService, ITask } from '../services/timesheet.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  tasks: ITask[];
  date: Date = new Date();
  displayedColumns: string[] = ['Project Description', 'Duration', 'Action'];
  datePicker = new FormControl(this.date);
  constructor(private timeSheetServices: TimesheetService) { }

  ngOnInit() {
    this.tasks = this.timeSheetServices.getTasks();
    console.log(this.tasks);
  }
  getTotalTime() {
    return this.tasks.map(t => t.minutes).reduce(( acc, value ) => acc + value, 0);
  }

  formatMinutes(mins: number) {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }
}
