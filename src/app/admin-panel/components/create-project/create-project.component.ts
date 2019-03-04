import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Client } from '../../../shared/models/client.model';
import { UserService } from '../../../shared/services/user.service';
import { ClientService } from '../../../shared/services/client.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin, BehaviorSubject, merge } from 'rxjs';
import { Task } from '../../../shared/models/task.model';
import { CreateProject } from '../../../shared/models/createProject.model';
import { ProjectService } from '../../services/project.service';
import { projectFormValidator } from '../../helpers/projectFormValidator';
import { MatSnackBar } from '@angular/material';
import { userInfo } from 'os';

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

  filteredUsers: Observable<User[]>;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
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

  userSelected(id: number) {
    if (this.selectedUsersIds.includes(id)) {
      this.onRemoveUser(id);
    } else {
      this.onAddUser(id);
    }
    console.log(this.selectedUsersIds);
  }

  onAddUser(id: number): void {
    this.selectedUsersIds.push(id);

    this.usersCompleted = true;
  }

  onAddTask(): void {
    const task: Task = {
      taskID: undefined,
      name: this.projectForm.value.addTaskControl,
      billable: false
    };

    this.projectForm.get('addTaskControl').setValue('');
    this.newTasks.push(task);

    this.tasksCompleted = true;
  }

  onRemoveTask(index: number): void {
    this.newTasks.splice(index, 1);

    if (this.newTasks.length === 0) {
      this.tasksCompleted = false;
    }
  }

  onBillableChange(index: number): void {
    this.newTasks[index].billable = !this.newTasks[index].billable;
  }

  onSubmit(): void {
    const createProject: CreateProject = {
      projectName: this.basicInfoFormGroup.value.projectName,
      clientId: this.basicInfoFormGroup.value.client ? this.projectForm.value.client.id : null,
      projectCode: this.basicInfoFormGroup.value.projectCode,
      tasks: this.newTasks,
      userIds: this.selectedUsersIds
    };

    this.errors = projectFormValidator(createProject);

    if (!this.errors) {
      this.projectService.addProject(createProject).subscribe(
        () => this.openSnackBar(),
        err => console.log(err)
      );
    }
  }

  openSnackBar() {
    this.snackBar.open('Success!', 'New Project added!', {
      duration: 2000,
    });
  }
}
