import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../user.service';

@Component({
  selector: 'tsk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User = null;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
    .subscribe(user => {
      this.loggedInUser = user;
    });
  }

}
