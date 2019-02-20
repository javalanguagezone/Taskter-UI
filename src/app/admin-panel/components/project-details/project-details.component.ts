import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'tsk-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProject(id);
        console.log(this.project);
      }
    );
  }

  getProject(id: number){
    this.projectService.getProjectById(id).subscribe(
      project => { this.project = project; }
    );
  }

}
