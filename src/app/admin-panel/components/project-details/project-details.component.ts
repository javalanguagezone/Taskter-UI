import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/shared/models/project.model';
import { User } from 'src/app/shared/models/user.model';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

import { MatDialog } from '@angular/material';
import { EditBasicProjectInfoComponent } from '../edit-basic-project-info/edit-basic-project-info.component';
import { EditBasicProjectInfo } from '../../../shared/models/editBasicProjectInfo.model';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'tsk-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  users: User[];
  observables: any = [];
  projectId: number;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private location: Location,
              private dialogue: MatDialog) { }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.projectId = +params.get('id');
      }
    );

    this.observables.push(this.projectService.getProjectById(this.projectId));
    this.observables.push(this.projectService.getUsersByProjectId(this.projectId));

    forkJoin(this.observables).subscribe(
       responseList => {
         this.project = responseList[0] as Project;
         this.users = responseList[1] as User[];
       }
    );
  }
  onBackClicked() {
    this.location.back();
  }
  openDialog(): void {
    const editData: EditBasicProjectInfo = {
      Id: this.project.projectID,
      Name: this.project.projectName,
      Code: this.project.projectCode
    }
    const dialogueRef = this.dialogue.open(EditBasicProjectInfoComponent, {
      width: '350px',
      data: editData
    });

    dialogueRef.afterClosed().subscribe(result => {
      this.observables.push(this.projectService.getProjectById(this.projectId));
      this.observables.push(this.projectService.getUsersByProjectId(this.projectId));

      forkJoin(this.observables).subscribe(
       responseList => {
         this.project = responseList[0] as Project;
         this.users = responseList[1] as User[];
       }
    );
    });
  }
}
