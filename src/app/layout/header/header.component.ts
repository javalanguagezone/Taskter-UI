import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../user.service';
import { UserMenuService } from '../user-menu/user-menu.service';

@Component({
  selector: 'tsk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User = null;
  constructor(private userService: UserService, private userMenuService: UserMenuService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.loggedInUser = user;
      });
  }

  toggleUserMenu() {
    this.userMenuService.toggle();
  }
}
