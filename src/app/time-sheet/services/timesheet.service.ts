import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { ProjectTaskEntry } from '../../shared/models/projectTaskEntry.model';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  constructor(private http: HttpClient) {}

  getTasks(year: number, month: number, day: number) {
    return this.http
      .get<ProjectTaskEntry[]>(
        `/api/users/current/entries/${year}/${month}/${day}`
      )
      .pipe(
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
