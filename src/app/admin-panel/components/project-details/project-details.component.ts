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
import { Task } from 'src/app/shared/models/task.model';
import { EditProjectTasksComponent } from '../edit-project-tasks/edit-project-tasks.component';
import { FromatBillable } from '../../pipes/billable.pipe';

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
        this.projectId = + params.get('id');
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
    console.log(this.project.tasks);
    const editData: EditBasicProjectInfo = {
      id: this.project.id,
      name: this.project.name,
      code: this.project.code
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

  activeTasks(): Task[] {
    return this.project.tasks.filter( task => task.active === true);
  }

  openTaskDialog(): void {
    const tasks: Task[] = this.project.tasks;

    const dialogueRef = this.dialogue.open(EditProjectTasksComponent, {
      width: '700px',
      data: {
        tasks: tasks,
        projectId: this.project.id
      }
    });

    dialogueRef.afterClosed().subscribe( reuslt => {
      this.observables.push(this.projectService.getProjectById(this.projectId));
      this.observables.push(this.projectService.getUsersByProjectId(this.projectId));

      forkJoin(this.observables).subscribe(
         responseList => {
           this.project = responseList[0] as Project;
           this.users = responseList[1] as User[];
           console.log(this.project);
         }
        );
      }
    );
  }
}
