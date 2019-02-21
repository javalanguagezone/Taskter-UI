import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { CreateProject } from '../../shared/models/createProject.model';
import { Project } from 'src/app/shared/models/project.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  // mockProjects: Project[] = [
  //   {
  //     projectId: 1,
  //     projectName: 'First project',
  //     projectCode: 'CO-989-FR',
  //     clientName: 'Tacta'
  //   },
  //   {
  //     projectId: 2,
  //     projectName: 'Second project',
  //     projectCode: 'CO-989-SC',
  //     clientName: 'Mistral'
  //   },
  //   {
  //     projectId: 3,
  //     projectName: 'Third project',
  //     projectCode: 'CO-989-TH',
  //     clientName: 'BHT'
  //   },
  // ];
  constructor(private http: HttpClient) {}

  addProject(data: CreateProject) {
    return this.http.post<CreateProject>('/api/project', data)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProjects() {
    return this.http.get<Project[]>('/api/projects').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getProjectById(id: number) {
   return this.http.get<Project>(`/api/projects/${id}`).pipe(
    retry(3),
    catchError(this.handleError)
  );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
