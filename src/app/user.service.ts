import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<User>('/api/users/currentUser');
  }
}
export interface User {
  username: string;
  avatarURL: string;
  role:string;
}