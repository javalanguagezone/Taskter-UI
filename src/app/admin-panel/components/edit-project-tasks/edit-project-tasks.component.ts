import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'tsk-edit-project-tasks',
  templateUrl: './edit-project-tasks.component.html',
  styleUrls: ['./edit-project-tasks.component.scss']
})
export class EditProjectTasksComponent implements OnInit {
  tasksCompleted: Boolean = true;
  tasks: Task[];
  projectId: number;

  projectForm = this.fb.group({
    addTaskControl: ['']
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProjectTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.tasks = this.data.tasks;
    this.projectId = this.data.projectId;
  }

  closeDialog() {
    this.dialogRef.close();
  }
  onAddTask(): void {
    const task: Task = {
      taskID: undefined,
      name: this.projectForm.value.addTaskControl,
      billable: false,
      active: true
    };
    if (this.tasks.find(tsk => tsk.name === task.name) !== undefined) {
      this.openSnackBar(
        'Error: ',
        'Task with the same name has already been added.'
      );
    } else if (task.name !== '') {
      this.projectForm.get('addTaskControl').setValue('');
      this.tasks.push(task);
    }

    this.tasksCompleted = true;
  }

  onActiveChange(index: number): void {
    this.tasks[index].active = !this.tasks[index].active;

    if (this.tasks.filter(task => task.active === true).length === 0) {
      this.tasksCompleted = false;
    } else {
      this.tasksCompleted = true;
    }
  }

  onBillableChange(index: number): void {
    this.tasks[index].billable = !this.tasks[index].billable;
  }

  save(): void {
    this.tasks.map(tsk => tsk['projectId'] = this.projectId);
    this.tasks.map(tsk => tsk['projectTaskId'] = tsk.taskID);
    console.log(this.tasks);
    this.projectService.editProjectTasks(this.tasks).subscribe(
      null,
      err => console.warn(err)
    );

    this.dialogRef.close();
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
