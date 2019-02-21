import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/models/project.model';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'tsk-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})

export class ProjectsListComponent implements OnInit {

  projects: Project[];
 // displayedColumns: string[] = ['Name', 'Code', 'Client'];

  displayedColumns: string[] = ['Name', 'Code', 'Client', 'Action'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }
  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(project => {
        this.projects = project;
        this.dataSource = new MatTableDataSource(this.projects);

      }
      );
  }
  ngOnInit() {
   this.getProjects();
  }


}
