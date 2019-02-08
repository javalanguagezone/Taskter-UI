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
  TimeEntryForm: FormGroup;
  editEntry: NewEntry;
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
    } else if (this.entryId === 0) {
      this.closeDialog();
      this.postNewEntry();
      this.TimeEntryForm.reset();
    } else {

      this.closeDialog();

    }

  }

  getEntry(): void {
    this.timeEntryDialogueService.getTaskEntry(this.entryId).subscribe(
      (entry: NewEntry) => { this.displayEntry(entry); }
    );
  }

  displayEntry(entry: NewEntry): void {
    if (this.TimeEntryForm) {
      this.TimeEntryForm.reset();
    }
    this.editEntry = entry;
    if (this.entryId === 0) {
      this.pageTitle = 'Add New Entry';
    } else {
      this.pageTitle = `Edit Entry`;
    }

    const projekt = this.nekafunkcija();
    console.log(projekt.tasks.find(x => x.taskID === this.editEntry.projectTaskId));
    const hours = Math.floor(this.editEntry.durationInMin / 60);
    const min =  this.editEntry.durationInMin % 60;


    // Update the data on the form
    this.TimeEntryForm.patchValue({
      project: projekt,
      task: projekt.tasks.find(x => x.taskID === this.editEntry.projectTaskId),
      hours: hours ,
      minutes: min,
      notes: this.editEntry.note

    });
    this.TimeEntryForm.get('project').valueChanges.subscribe(val => {
      this.TimeEntryForm.controls.task.setValue = val.tasks.find(x => x.taskID === this.editEntry.projectTaskId);
    });
    console.log(this.TimeEntryForm);


  }
  nekafunkcija(): UserProject {
    console.log('usao');
    let key: UserProject;
    console.log('Duzina userprojects ' + this.userProjects.length);
    for (let i = 0; i < this.userProjects.length; i++) {
      console.log('Duzina tasks ' + this.userProjects[i].tasks.length);
      for (let j = 0; j < this.userProjects[i].tasks.length; j++) {
        const currentTask = this.userProjects[i].tasks[j];
        console.log(currentTask);
        if (currentTask.taskID === this.editEntry.projectTaskId) {
          key = this.userProjects[i];
          console.log(key);
          return key;
        }
      }
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
}
