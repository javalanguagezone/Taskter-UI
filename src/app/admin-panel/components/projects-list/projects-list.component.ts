import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tsk-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})

export class ProjectsListComponent implements OnInit {

  projects: Project[];
  displayedColumns: string[] = ['Name', 'Code', 'Client', 'Action'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(project => {
        this.projects = project;
        this.dataSource = new MatTableDataSource(this.projects);
        console.log(this.projects);
      }
      );
  }
}
