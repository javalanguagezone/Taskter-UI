import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProjectTaskEntry } from '../../services/timesheet.service';
import { NewEntry } from '../timesheet.component';


@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent {
  currentDate: Date;
  constructor(public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewEntry[]) {
      this.currentDate = new Date();
    }

  onNoClick(): void {
    this.dialogRef.close();
  
  }

 }


