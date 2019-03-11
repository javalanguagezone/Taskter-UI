import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectService } from '../../services/project.service';
import { identity } from 'rxjs';

@Component({
  selector: 'tsk-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = [];
  selected: Client;
  clientProjects: Project[] = [];
  constructor(private clientService: ClientService, private projectServie: ProjectService ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients()
      .subscribe(client => {
        this.clients = client;
        this.selected = client[0];
        this.getProjectsByClient();
      }
      );
  }

  getProjectsByClient(): void {
    this.projectServie.getProjectByClientId(this.selected.id)
      .subscribe(project => {
        this.clientProjects = project;
      }
      );
  }

  change(event) {
    if ( event.isUserInput ) {
      this.selected = this.clients.find(x => x.id === event.source.value.id);
      this.getProjectsByClient();
    }
  }
}
