import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Client } from '../../../shared/models/client.model';
import { UserService } from '../../../shared/services/user.service';
import { ClientService } from '../../../shared/services/client.service';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { forkJoin} from 'rxjs';
import { Task } from '../../../shared/models/task.model';
import { CreateProject } from '../../../shared/models/createProject.model';
import { ProjectService } from '../../services/project.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'tsk-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {
  errors: string[] = null;
  users: User[] = [];
  clients: Client[] = [];

  selectedUsersIds: number[] = [];
  usersCompleted: Boolean = false;

  newTasks: Task[] = [];
  tasksCompleted: Boolean = false;

  projectForm = this.fb.group({
    addUserControl: [],
    addTaskControl: ['']
  });

  basicInfoFormGroup = this.fb.group({
    projectName: ['', Validators.required],
    projectCode: ['', Validators.required]
  });

  projectClientFormGroup = this.fb.group({
    client: [null, Validators.required]
  });

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

    forkJoin(
      this.userService.getAllUsers(),
      this.clientService.getAllClients()
    )
    .subscribe(([users, clients]) => {
      this.users = users;
      this.clients = clients;
    });
  }

  onRemoveUser(id: number): void {
    this.selectedUsersIds = this.selectedUsersIds.filter( value => {
      return value !== id;
    });

    if (this.selectedUsersIds.length === 0) {
      this.usersCompleted = false;
    }
  }

  userSelected(id: number): void {
    if (this.selectedUsersIds.includes(id)) {
      this.onRemoveUser(id);
    } else {
      this.onAddUser(id);
    }
  }

  onAddUser(id: number): void {
    this.selectedUsersIds.push(id);

    this.usersCompleted = true;
  }

  onNextStepUser(): void {
    if (!this.usersCompleted) {
      this.openSnackBar('Error: ', 'You must choose at least one user.');
    }
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

  onNextStepTask(): void {
    if (!this.tasksCompleted) {
      this.openSnackBar('Error: ', 'You must enter at least one task.');
    }
  }

  onBillableChange(index: number): void {
    this.newTasks[index].billable = !this.newTasks[index].billable;
  }

  onSubmit(): void {
    const createProject: CreateProject = {
      projectName: this.basicInfoFormGroup.value.projectName,
      clientId: this.projectClientFormGroup.value.client ? this.projectClientFormGroup.value.client.id : null,
      projectCode: this.basicInfoFormGroup.value.projectCode,
      tasks: this.newTasks,
      userIds: this.selectedUsersIds
    };

    this.projectService.addProject(createProject).subscribe(
      () => {
        this.openSnackBar('Success!', 'New Project added!');
        this.router.navigate(['/adminPanel/projects']);
      },
      err => console.log(err)
    );
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
