import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Client } from '../../../shared/models/client.model';
import { UserService } from '../../../shared/services/user.service';
import { ClientService } from '../../../shared/services/client.service';


@Component({
  selector: 'tsk-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) { }

  users: User[] = [];
  clients: Client[] = [];

  ngOnInit() {
    this.getAllUsers();
    this.getAllClients();
  }

  getAllUsers() {
    this.userService.getAllUsers()
    .subscribe(
      users => {
        this.users = users;
        console.log(users);
      }
    );
  }

  getAllClients() {
    this.clientService.getAllUsers()
    .subscribe(
      clients => {
        this.clients = clients;
        console.log(clients);
      }
    );
  }
}
