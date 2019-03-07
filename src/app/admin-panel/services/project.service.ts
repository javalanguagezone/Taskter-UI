import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { CreateProject } from '../../shared/models/createProject.model';
import { Project } from 'src/app/shared/models/project.model';
import { User } from 'src/app/shared/models/user.model';
import { EditBasicProjectInfo } from '../../shared/models/editBasicProjectInfo.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
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

  getUsersByProjectId(id: number) {
    return this.http.get<User[]>(`/api/projects/${id}/users`).pipe(
     retry(3),
     catchError(this.handleError)
   );
   }

  editBasicProjectInformation(data: EditBasicProjectInfo) {
    return this.http.put(`api/projects/${data.Id}/edit/basicinfo`, data).pipe(
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
