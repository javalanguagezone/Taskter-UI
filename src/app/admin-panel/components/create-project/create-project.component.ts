import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Client } from '../../../shared/models/client.model';
import { UserService } from '../../../shared/services/user.service';
import { ClientService } from '../../../shared/services/client.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin, BehaviorSubject, merge } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Task } from '../../../shared/models/task.model';
import { CreateProject } from '../../../shared/models/createProject.model';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'tsk-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit {

  users: User[] = [];
  clients: Client[] = [];

  selectedUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  newTasks: Task[] = [];

  projectForm = this.fb.group({
    projectName: ['', [Validators.required]],
    projectCode: ['', [Validators.required]],
    client: ['', [Validators.required]],
    addUserControl: [],
    addTaskControl: ['', [Validators.required]]
  });

  filteredClients: Observable<Client[]>;
  filteredUsers: Observable<User[]>;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {

    forkJoin(
      this.userService.getAllUsers(),
      this.clientService.getAllClients()
    )
    .subscribe(([users, clients]) => {
      this.users = users;
      this.clients = clients;

      this.filteredUsers = merge (
        this.projectForm.get('addUserControl').valueChanges,
        this.selectedUsers
      )
        .pipe(
          startWith<string>(''),
          map(value => typeof value === 'string' ? value : ''),
          map(user => user ? this._filterUsers(user) : this._filterUsers(user))
        );
      this.filteredClients = this.projectForm.get('client').valueChanges
      .pipe(
        startWith<string | Client>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(client => client ? this._filterClients(client) : this.clients.slice())
      );
    });
  }

  _filterClients(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(client => client.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayClient(client?: Client): string | undefined {
    return client ? client.name : undefined;
  }

  removeUser(index: number) {
    const selectedUsers = this.selectedUsers.getValue();
    selectedUsers.splice(index, 1);
    this.selectedUsers.next(selectedUsers);
  }

  addUser(id) {
    this.selectedUsers.next([...this.selectedUsers.getValue(), this.users.find(user => user.userId === id)]);
  }

  _filterUsers(value: string): User[] {
    const filterUser = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().indexOf(filterUser) === 0
    && !this.selectedUsers.value.includes(user));
  }

  addTask() {
    const task: Task = {
      taskID: undefined,
      name: this.projectForm.value.addTaskControl,
      billable: false
    };

    this.projectForm.get('addTaskControl').setValue('');
    this.newTasks.push(task);
  }

  removeTask(index) {
    this.newTasks.splice(index, 1);
  }

  onBillableChange(index) {
    this.newTasks[index].billable = !this.newTasks[index].billable;
  }

  onSubmit() {
    const createProject: CreateProject = {
      projectName: this.projectForm.value.projectName,
      client: this.projectForm.value.client,
      projectCode: this.projectForm.value.projectCode,
      tasks: this.newTasks,
      userIds: Array.from(this.selectedUsers.value, u => u.userId)
    };

    this.projectService.addProject(createProject);
  }
}
