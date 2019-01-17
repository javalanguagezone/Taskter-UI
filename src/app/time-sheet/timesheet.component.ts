import { Component, OnInit } from '@angular/core';
import { TimesheetService, ProjectTaskEntry, UserProject } from '../services/timesheet.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TimeEntryDialogueComponent } from './time-entry-dialogue/time-entry-dialogue.component';

@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})

export class TimesheetComponent implements OnInit {

  tasks: ProjectTaskEntry[] = [];
  currentUserProjects: UserProject[] = [];
  date: Date = new Date();
  datePicker = new FormControl(this.date);
  timeEntries: NewEntry[] = [];

  day = 15;
  month = 1;
  year = 2019;

  constructor(
    private timeSheetServices: TimesheetService,
    private route: ActivatedRoute,
    private dialogue: MatDialog
    ) {}

  ngOnInit() {
    this.timeSheetServices.getTasks(this.day, this.month, this.year)
    .subscribe( tasks => {
              this.tasks = tasks;
              // console.log(this.tasks);
            });
    this.timeSheetServices.getProjectsForCurrentUser()
      .subscribe(userProjects => {
        this.currentUserProjects = userProjects; },
        err => {console.error(err); }
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
      width: '350px',
      data: [this.currentUserProjects, this.date]
    });

    dialogueRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
 }
}
export class NewEntry {
  UserId: number;
  TaskId: number;
  DurationInMin: number;
  Note: string;
  Day: number;
  Month: number;
  Year: number ;
}
