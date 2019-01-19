import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/user.service';
import { Validators, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { TimeEntryDialogueService, UserProject, NewEntry } from './TimeEntryDialogueService';


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
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: moment.Moment,
    private userService: UserService, private timeEntryService: TimeEntryDialogueService) {}

  ngOnInit(): void {
    this.currentDate = this.data;
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });

    this.timeEntryService.getProjectsForCurrentUser().subscribe(projects => {
      this.userProjects = projects;
    });

    this.TimeEntryForm = new FormGroup({
      project: new FormControl('', [Validators.required]),
      task: new FormControl({value: '', disabled: true}, [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      minutes: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  get f(): any { return this.TimeEntryForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleTaskDropdown() {
    this.f.task.reset();
    if (this.f.task.status === 'DISABLED') {
      this.f.task.enable();
    }
  }

  onSubmit() {
    if (this.TimeEntryForm.invalid) {
      return;
    }
    const entry: NewEntry = {
     userId: this.currentUser.userId,
     projectTaskId: this.TimeEntryForm.controls['task'].value['taskID'],
     durationInMin: this.TimeEntryForm.controls['hours'].value * 60 + this.TimeEntryForm.controls['minutes'].value,
     note: this.TimeEntryForm.controls['notes'].value,
     day: this.currentDate.date(),
     month: this.currentDate.month() + 1,
     year: this.currentDate.year()
    };

    this.timeEntryService.addTimeEntry(entry).subscribe(res => {},
        err => { console.error(err); }
      );

    this.resetFormControl();
  }

  resetFormControl() {
    this.formDirective.resetForm();
    this.TimeEntryForm.reset({
      project: '',
      task: {value: '', disabled: true},
      hours: '',
      minutes: '',
      notes: ''
    });
  }
 }

