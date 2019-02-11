import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Client } from '../../../shared/models/client.model';
import { UserService } from '../../../shared/services/user.service';
import { ClientService } from '../../../shared/services/client.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Task } from '../../../shared/models/task.model';


@Component({
  selector: 'tsk-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  allUsers: User[] = [];
  clients: Client[] = [];

  selectedUsers: User[] = [];
  newTasks: Task[] = [];

  projectForm = this.fb.group({
    projectName: ['', [Validators.required]],
    client: ['', [Validators.required]],
    addUserControl: [],
    addTaskControl: []
  });

  filteredClients: Observable<Client[]>;
  filteredUsers: Observable<User[]>;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.getAllClients();
  }

  _filterClients(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter(client => client.name.toLowerCase().indexOf(filterValue) === 0);
  }

  _filterUsers(value: string): User[] {
    const filterUser = value.toLowerCase();
    return this.allUsers.filter(user => user.username.toLowerCase().indexOf(filterUser) === 0
    && !this.selectedUsers.includes(user));
  }

  addTask() {
    const task: Task = {
      taskID: null,
      name: this.projectForm.value.addTaskControl.value,
      billable: false
    };

    this.projectForm.get('addTaskControl').setValue('');
    this.newTasks.push(task);
  }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe(
      users => {
        this.allUsers = users;

        this.filteredUsers = this.projectForm.get('addUserControl').valueChanges
        .pipe(
          startWith<string | User>(''),
          map(value => typeof value === 'string' ? value : value.username),
          map(user => user ? this._filterUsers(user) : this._filterUsers(user))
        );
      }
    );
  }

  displayUser(user?: User): string | undefined {
    return user ? user.username : undefined;
  }

  removeUser(index: number): void {
    this.selectedUsers.splice(index, 1);

    if (this.allUsers.length === this.selectedUsers.length) {
      this.projectForm.get('addUserControl').disable();
    } else {
      this.projectForm.get('addUserControl').enable();
    }
  }

  addUser() {
    if (this.projectForm.value.addUserControl.hasOwnProperty('userId')) {
      this.selectedUsers.push(this.projectForm.value.addUserControl);
    }

    this.projectForm.get('addUserControl').setValue('');
    if (this.allUsers.length === this.selectedUsers.length) {
      this.projectForm.get('addUserControl').disable();
    } else {
      this.projectForm.get('addUserControl').enable();
    }
  }

  getAllClients() {
    this.clientService.getAllUsers()
    .subscribe(
      clients => {
        this.clients = clients;

        this.filteredClients = this.projectForm.get('client').valueChanges
        .pipe(
          startWith<string | Client>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(client => client ? this._filterClients(client) : this.clients.slice())
        );
      }
    );
  }

  displayClient(client?: Client): string | undefined {
    return client ? client.name : undefined;
  }

  onBillableChange(index) {
    this.newTasks[index].billable = !this.newTasks[index.billable];
  }

  removeTask(index) {
    this.newTasks.splice(index, 1);
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
