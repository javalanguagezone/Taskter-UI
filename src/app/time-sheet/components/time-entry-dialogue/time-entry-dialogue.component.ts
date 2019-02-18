import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';
import { UserProject } from 'src/app/shared/models/userProject.model';
import { TimeEntryDialogueService } from '../../services/timeEntryDialogue.service';
import { Task } from 'src/app/shared/models/task.model';
import { TaskEntryUpdate } from 'src/app/shared/models/TaskEntryUpdate';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'tsk-time-entry-dialogue',
  templateUrl: './time-entry-dialogue.component.html',
  styleUrls: ['./time-entry-dialogue.component.scss']
})
export class TimeEntryDialogueComponent implements OnInit {
  hideSpinner = false;
  pageTitle = 'Add New Entry';
  observables: any = [];
  currentUser: User = {} as User;
  currentDate: moment.Moment;
  userProjects: UserProject[] = [];
  projectTasks: Task[] = [];
  TimeEntryForm: FormGroup;
  editEntry: TaskEntryUpdate;
  entryId: number;
  constructor(
    private snackBar: MatSnackBar,
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

    this.observables.push(this.userService.getCurrentUser());
    this.observables.push(this.timeEntryDialogueService.getProjectsForCurrentUser());
    if (this.isEdit) {
      this.observables.push(this.timeEntryDialogueService.getTaskEntry(this.entryId));
    }

    forkJoin(this.observables).subscribe(
      responseList => {
        this.currentUser = responseList[0] as User;
        this.userProjects = responseList[1] as UserProject[];
        this.editEntry = responseList[2] as TaskEntryUpdate;
        if (this.isEdit) {
          this.displayEntry();
        }
        this.TimeEntryForm.get('projectID').valueChanges.subscribe(val => {
          this.toggleTaskDropdown(val);
        });
        this.toggleSpinner();
      }
    );
  }

  get f(): any {
    return this.TimeEntryForm.controls;
  }

  get isEdit(): boolean {
    return this.entryId ? true : false;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleTaskDropdown(selectedProjectId: number) {
    this.f.taskID.reset();
    if (this.f.taskID.status === 'INVALID' || this.f.taskID.status === 'DISABLED') {
      this.f.taskID.enable();
    } else {
      this.f.taskID.disable();
    }
    this.projectTasks = this.userProjects.find(x => x.projectID === selectedProjectId).tasks;
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  onSubmit() {
    if (this.TimeEntryForm.invalid || this.TimeEntryForm.untouched) {
      return;
    } else if (!this.isEdit) {
      this.postNewEntry();
    } else {
      this.editEntry.projectId = this.TimeEntryForm.get('projectID').value;
      this.editEntry.projectTaskId = this.TimeEntryForm.get('taskID').value;
      this.editEntry.durationInMin = this.TimeEntryForm.get('hours').value * 60 + this.TimeEntryForm.get('minutes').value;
      this.editEntry.note = this.TimeEntryForm.get('notes').value;
      this.updateEntry();

    }


  }

  displayEntry(): void {
    if (this.TimeEntryForm) {
      this.TimeEntryForm.reset();
    }
    this.pageTitle = 'Edit Entry';
    const hours = Math.floor(this.editEntry.durationInMin / 60);
    const min = this.editEntry.durationInMin % 60;
    this.toggleTaskDropdown(this.editEntry.projectId);
    this.TimeEntryForm.patchValue({
      projectID: this.editEntry.projectId,
      taskID: this.editEntry.projectTaskId,
      hours: hours,
      minutes: min,
      notes: this.editEntry.note
    });
  }

  postNewEntry() {
    this.timeEntryDialogueService.addTimeEntry(this.TimeEntryForm.value, this.currentUser.userId, this.currentDate).subscribe(
      () => {
        this.closeDialog();
        this.snackBar.open('Success', 'Close', {
          duration: 2000,
        });
      },
      err => {
        this.snackBar.open(err, 'Close', {
          duration: 2000,
        });
        console.error(err);
      }
    );
  }

  updateEntry() {
    this.timeEntryDialogueService.updateTaskEntry(this.editEntry).subscribe(
      () => {
        this.closeDialog();
        this.snackBar.open('Success', 'Close', {
        duration: 2000,
      });
    },
      err => {
        this.snackBar.open(err, 'Close', {
          duration: 2000,
        });
        console.error(err);
      }
    );
  }
}
