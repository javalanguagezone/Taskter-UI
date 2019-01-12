import { Component, OnInit, OnChanges } from '@angular/core';
import { TimesheetService, ITask } from '../services/timesheet.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit, OnChanges {

  tasks: ITask[] = [];
  date: Date = new Date();
  displayedColumns: string[] = ['Project Description', 'Duration', 'Action'];
  datePicker = new FormControl(this.date);
  constructor(
    private timeSheetServices: TimesheetService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.timeSheetServices.getTasks()
    .subscribe(
      task => {
        this.tasks.push(task);
      }
    );
    this.route.paramMap.subscribe( params => {
        if (params.keys.length > 0) {
          this.date.setFullYear(Number(params.get('year')));
          this.date.setMonth(Number(params.get('month')) - 1);
          this.date.setDate(Number(params.get('day')));
        }
      }
    );
  }

  ngOnChanges() {
    console.log('desila se promjena');
  }

  getTotalTime() {
    return this.tasks.map(t => t.minutes).reduce(( acc, value ) => acc + value, 0);
  }

  formatMinutes(mins: number) {
    let h: any = Math.floor(mins / 60);
    let m: any = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `HH: ${h} MM: ${m}`;
  }

  nextDate() {
    const newDate = new Date();
    newDate.setDate(this.date.getDate() + 1);
    this.date = newDate;
  }

  previousDate() {
    const newDate = new Date();
    newDate.setDate(this.date.getDate() - 1);
    this.date = newDate;
  }

  currentDay() {
    this.date = new Date();
  }
}
