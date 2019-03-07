import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task } from 'src/app/shared/models/task.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'tsk-edit-project-tasks',
  templateUrl: './edit-project-tasks.component.html',
  styleUrls: ['./edit-project-tasks.component.scss']
})
export class EditProjectTasksComponent implements OnInit {
  newTasks: Task[] = [];
  tasksCompleted: Boolean = false;

  projectForm = this.fb.group({
    addTaskControl: ['']
  });

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProjectTasksComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Task[]) { }

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

      if (this.newTasks.find(tsk => tsk.name === task.name ) !== undefined) {
        this.openSnackBar('Error: ', 'Task with the same name has already been added.');
      } else if (task.name !== '') {
        this.projectForm.get('addTaskControl').setValue('');
        this.newTasks.push(task);
      }

      this.tasksCompleted = true;
    }

    onRemoveTask(index: number): void {
      this.newTasks.splice(index, 1);

      if (this.newTasks.length === 0) {
        this.tasksCompleted = false;
      }
    }


  ngOnInit() {
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
