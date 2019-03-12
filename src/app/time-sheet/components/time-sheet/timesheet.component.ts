import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { ProjectTaskEntry } from '../../../shared/models/projectTaskEntry.model';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TimeEntryDialogueComponent } from '../time-entry-dialogue/time-entry-dialogue.component';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})

export class TimesheetComponent implements OnInit {


  datePicker = new FormControl();
  tasks: ProjectTaskEntry[] = [];
  _date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment(new Date()));

  get date() {
    return this._date.getValue();
  }
  set date(value: moment.Moment) {
    this._date.next(value);
  }

  constructor(
    private timeSheetServices: TimesheetService,
    private route: ActivatedRoute,
    private dialogue: MatDialog,
    private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getTaskByDate(year, month, day): void {
    this.timeSheetServices.getTasks(year, month, day)
      .subscribe(task => {
        this.tasks = task; }
      );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.date.year(Number(params.get('year')));
        this.date.month(Number(params.get('month')) - 1);
        this.date.date(Number(params.get('day')));
      }

      this.datePicker = new FormControl(new Date(this.date.year(), this.date.month(), this.date.date()));
      this.getTaskByDate(this.date.year(), this.date.month() + 1, this.date.date());
    });
  }

  onDatePickerChange() {
    this.date = moment(this.datePicker.value);
    this.router.navigate([`timeSheet/${this.date.year()}/${this.date.month() + 1}/${this.date.date()}`]);
  }

  nextDate() {
    const tomorrow = this.date.add(1, 'days');
    this.router.navigate([`timeSheet/${tomorrow.year()}/${tomorrow.month() + 1}/${tomorrow.date()}`]);
  }

  previousDate() {
    const yesterday = this.date.add(-1, 'days');
    this.router.navigate([`timeSheet/${yesterday.year()}/${yesterday.month() + 1}/${yesterday.date()}`]);
  }

  currentDay() {
    this.router.navigate([`timeSheet`]);
  }

  openDialog(): void {
    const dialogueRef = this.dialogue.open(TimeEntryDialogueComponent, {
      width: '350px',
      data: {date: this.date, EntryId: 0}
    });

    dialogueRef.afterClosed().subscribe(result => {
      this.getTaskByDate(this.date.year(), this.date.month() + 1, this.date.date());
    });
  }
}
