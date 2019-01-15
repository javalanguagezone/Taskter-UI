import { Component, OnInit } from '@angular/core';
import { TimesheetService, ProjectTaskEntry } from '../services/timesheet.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TimeEntryDialogueComponent } from './time-entry-dialogue/time-entry-dialogue.component';

@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})

export class TimesheetComponent implements OnInit {

  tasks: ProjectTaskEntry[] = [];
  date: Date = new Date();
  datePicker = new FormControl(this.date);
  constructor(
    private timeSheetServices: TimesheetService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogue: MatDialog
    ) {}

  ngOnInit() {
    this.timeSheetServices.getTasks()
    .subscribe(
      task => {
        this.tasks.push(task);
        console.log(this.tasks);
      }
    );
    this.route.paramMap.subscribe( params => {
        if (params.keys.length > 0) {
          this.date.setFullYear(Number(params.get('year')));
          this.date.setMonth(Number(params.get('month')) - 1);
          this.date.setDate(Number(params.get('day')));
        }
      });
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
