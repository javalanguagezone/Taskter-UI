import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';
import { UserProject } from 'src/app/shared/models/userProject.model';
import { TimeEntryDialogueService } from '../../services/timeEntryDialogue.service';

@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent implements OnInit {
  currentUser: User = {} as User;
  currentDate: moment.Moment;
  userProjects: UserProject[] = [];
  TimeEntryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: moment.Moment,
    private userService: UserService,
    private timeEntryDialogueService: TimeEntryDialogueService
  ) { }

  ngOnInit(): void {
    this.currentDate = this.data;
    this.getCurrentUser();
    this.getUserProjects();
    this.TimeEntryForm = new FormGroup({
      project: new FormControl(null, [Validators.required]),
      task: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      hours: new FormControl(null, [Validators.required]),
      minutes: new FormControl(null, [Validators.required]),
      notes: new FormControl(null)
    });

  }

  get f(): any {
    return this.TimeEntryForm.controls;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleTaskDropdown() {
    this.f.task.reset();
    if (this.f.task.status === 'DISABLED') {
      this.f.task.enable();
    } else {
      this.f.task.disable();
    }
  }

  onSubmit() {
    if (this.TimeEntryForm.invalid || this.TimeEntryForm.untouched) {
      return;
    }

    this.closeDialog();
    this.postNewEntry();
    this.TimeEntryForm.reset();
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  getUserProjects(): void {
    this.timeEntryDialogueService.getProjectsForCurrentUser().subscribe(
      projects => {
        this.userProjects = projects;
      },
      err => {
        console.log(err);
      }
    );
  }

  postNewEntry() {
    this.timeEntryDialogueService.addTimeEntry(this.TimeEntryForm.value, this.currentUser.userId, this.currentDate).subscribe(
      () => { },
      err => {
        console.error(err);
      }
    );
  }
}
