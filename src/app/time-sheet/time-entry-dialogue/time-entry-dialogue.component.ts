import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldControl} from '@angular/material';
import { UserProject } from '../../services/timesheet.service';
import { NewEntry } from '../timesheet.component';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/user.service';


@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent implements OnInit {
  ngOnInit(): void {
   this.userService.getCurrentUser().subscribe(user => {
     this.CurrentUser = user;
   });
  
}
CurrentUser: User;

  TimeEntryForm = new FormGroup({
    projectName: new FormControl(''),
    task: new FormControl(''),
    hours: new FormControl(''),
    minutes: new FormControl(''),
    notes: new FormControl('')
  });

  currentDate: Date;
  constructor(public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProject[],
     private userService: UserService) {
      this.currentDate = new Date();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    let entry: NewEntry = { 
     UserId: this.CurrentUser.userId,
     TaskId: this.TimeEntryForm.controls["task"].value["taskID"],
     DurationInMin: this.TimeEntryForm.controls["hours"].value * 60 + this.TimeEntryForm.controls["minutes"].value,
     Note: this.TimeEntryForm.controls['minutes'].value,
     Day: this.currentDate.getDate(),
     Month: this.currentDate.getMonth() + 1,
     Year: this.currentDate.getFullYear()
  };
    console.warn(entry);
  }
 }


