import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

import { NavigationMenuService } from '../navigation-menu/navigation-menu.service';

import { UserMenuService } from '../user-menu/user-menu.service';


@Component({
  selector: 'tsk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User = null;
  toggleActive: Boolean = false;
  constructor(private userService: UserService, private userMenuService: UserMenuService, private sidenav: NavigationMenuService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.loggedInUser = user;
      });
  }

  toggleNavigationMenu() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }

  toggleUserMenu() {
    this.userMenuService.toggle();
  }

}
