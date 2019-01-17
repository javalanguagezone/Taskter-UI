import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserProject } from '../../services/timesheet.service';
import { NewEntry } from '../timesheet.component';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/user.service';
import * as moment from 'moment';

@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent implements OnInit {
  currentUser: User = {} as User;
  currentDate: moment.Moment;

  TimeEntryForm = new FormGroup({
    project: new FormControl(''),
    task: new FormControl(''),
    hours: new FormControl(''),
    minutes: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [UserProject[], moment.Moment],
     private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.currentDate = this.data[1];
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const entry: NewEntry = {
     UserId: this.currentUser.userId,
     TaskId: this.TimeEntryForm.controls['task'].value['taskID'],
     DurationInMin: this.TimeEntryForm.controls['hours'].value * 60 + this.TimeEntryForm.controls['minutes'].value,
     Note: this.TimeEntryForm.controls['minutes'].value,
     Day: this.currentDate.date(),
     Month: this.currentDate.month() + 1,
     Year: this.currentDate.year()
  };
    console.warn(entry);
  }
 }


