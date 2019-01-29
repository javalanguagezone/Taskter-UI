import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { NewEntry } from 'src/app/shared/models/newTaskEntry.model';
import { UserProject } from 'src/app/shared/models/userProject.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeEntryDialogueService {
  constructor(private http: HttpClient) {}

  addTimeEntry(formValue: any, currentUserId: number, currentDate: moment.Moment) {
    const newEntry: NewEntry = {
      userId: currentUserId,
      projectTaskId: formValue.task.taskID,
      durationInMin: formValue.hours * 60 + formValue.minutes,
      note: formValue.notes,
      day: currentDate.date(),
      month: currentDate.month() + 1,
      year: currentDate.year()
    };
    return this.http.post<NewEntry>('/api/entries', newEntry).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getProjectsForCurrentUser() {
    return this.http
      .get<UserProject[]>('/api/users/current/projects')
      .pipe(catchError(this.handleError));
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
