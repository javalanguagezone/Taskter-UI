import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';
import { UserProject } from 'src/app/shared/models/userProject.model';
import { TimeEntryDialogueService } from '../../services/timeEntryDialogue.service';
import { NewEntry } from 'src/app/shared/models/newTaskEntry.model';
import { Task } from 'src/app/shared/models/task.model';
import { TaskEntryUpdate } from 'src/app/shared/models/TaskEntryUpdate';

@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent implements OnInit {
  pageTitle = '';
  currentUser: User = {} as User;
  currentDate: moment.Moment;
  userProjects: UserProject[] = [];
  projectTasks: Task[] = [];
  TimeEntryForm: FormGroup;
  editEntry: TaskEntryUpdate;
  entryId: number;
  constructor(
    public dialogRef: MatDialogRef<TimeEntryDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private timeEntryDialogueService: TimeEntryDialogueService
  ) { }

  ngOnInit(): void {
    this.currentDate = this.data.date;
    this.entryId = this.data.EntryId;

    this.TimeEntryForm = new FormGroup({
      projectID: new FormControl(null, [Validators.required]),
      taskID: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      hours: new FormControl(null, [Validators.required]),
      minutes: new FormControl(null, [Validators.required]),
      notes: new FormControl(null)
    });
    this.getCurrentUser();
    this.getUserProjects();
    this.TimeEntryForm.get('projectID').valueChanges.subscribe(val => {
      if (val !== null) {
        this.projectTasks = this.userProjects.find(x => x.projectID === val).tasks;
        this.toggleTaskDropdown();
      }
    });

  }
  get f(): any {
    return this.TimeEntryForm.controls;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleTaskDropdown() {
    this.f.taskID.reset();
    if (this.f.taskID.status === 'INVALID' || this.f.taskID.status === 'DISABLED') {
      this.f.taskID.enable();
    } else {
      this.f.taskID.disable();
    }
    console.log('vrijednost forme poslije toggletaskdropdown:', this.TimeEntryForm);
  }

  onSubmit() {
    if (this.TimeEntryForm.invalid || this.TimeEntryForm.untouched) {
      return;
    } else if (this.entryId === 0) {

      this.postNewEntry();

    } else {

      this.editEntry.projectId = this.TimeEntryForm.get('projectID').value;
      this.editEntry.projectTaskId = this.TimeEntryForm.get('taskID').value;
      this.editEntry.durationInMin = this.TimeEntryForm.get('hours').value * 60 + this.TimeEntryForm.get('minutes').value;
      this.editEntry.note = this.TimeEntryForm.get('notes').value;
      this.updateEntry();

    }
    this.closeDialog();
    this.TimeEntryForm.reset();
  }

  getEntry(): void {
    if (this.entryId !== 0) {
      this.timeEntryDialogueService.getTaskEntry(this.entryId).subscribe(
        (entry: TaskEntryUpdate) => { this.displayEntry(entry); }
      );
    } else {
      this.displayEntry(null);
    }

  }

  displayEntry(entry: TaskEntryUpdate): void {
    if (this.TimeEntryForm) {
      this.TimeEntryForm.reset();
    }
    this.editEntry = entry;

    if (this.entryId === 0) {
      this.pageTitle = 'Add New Entry';

    } else {
      this.pageTitle = `Edit Entry`;
      this.f.taskID.enable();

      const hours = Math.floor(this.editEntry.durationInMin / 60);
      const min = this.editEntry.durationInMin % 60;


      // Update the data on the form
      this.TimeEntryForm.patchValue({
        projectID: this.editEntry.projectId,
        taskID: this.editEntry.projectTaskId,
        hours: hours,
        minutes: min,
        notes: this.editEntry.note

      });


    }

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
        this.getEntry();

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

  updateEntry() {
    this.timeEntryDialogueService.updateTaskEntry(this.editEntry).subscribe(
      () => { },
      err => {
        console.error(err);
      }
    );
  }
}
