import { Component, OnInit } from '@angular/core';
import { TimesheetService, ProjectTaskEntry } from '../services/timesheet.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TimeEntryDialogueComponent } from './time-entry-dialogue/time-entry-dialogue.component';
import * as moment from 'moment';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})

export class TimesheetComponent implements OnInit {

  tasks: ProjectTaskEntry[] = [];



  _date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment(new Date()));
  get date() {
    return this._date.getValue();
  }
  set date(value: moment.Moment) {
    console.log(value);
    this._date.next(value);
  }

  datePicker = new FormControl(this._date);

  constructor(
    private timeSheetServices: TimesheetService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogue: MatDialog
    ) { }


    getTaskByDate(day, month, year): void {
      this.timeSheetServices.getTasks(day, month, year)
      .subscribe( task => {
                this.tasks = task;
                console.log(this.tasks);
              }
      );
    }
  ngOnInit() {
    console.log(this._date);

    this.getTaskByDate(this.date.date(), this.date.month() + 1 , this.date.year());


    this.route.paramMap.subscribe( params => {
        if (params.keys.length > 0) {
          this.date.year(Number(params.get('year')));
          this.date.month(Number(params.get('month')) - 1);
          this.date.date(Number(params.get('day')));
        }
      });
  }


  onChange(event: any, newDate: any): void {

    this.getTaskByDate(this.date.date(), this.date.month() + 1 , this.date.year());
  }
  nextDate() {

    const tomorrow  = this.date.add(1, 'days');
    this.date = tomorrow;
    this.getTaskByDate(this.date.date(), this.date.month() + 1 , this.date.year());
  }

  previousDate() {
    const yesterday = this.date.add(-1, 'days');
    this.date = yesterday;
    this.getTaskByDate(this.date.date(), this.date.month() + 1 , this.date.year());
  }

  currentDay() {
    this.date = moment(new Date());
    this.getTaskByDate(this.date.date(), this.date.month() + 1 , this.date.year());
  }

  openDialog(): void {
    const dialogueRef = this.dialogue.open(TimeEntryDialogueComponent, {
      width: '250px',
      data: this.tasks
    });

    dialogueRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
 }
}
