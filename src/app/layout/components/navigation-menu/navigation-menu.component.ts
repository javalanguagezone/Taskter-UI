import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'tsk-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  loggedInUser: User = null;

  constructor(private userService: UserService, private layoutService: LayoutService) { }

  ngOnInit() {

    this.userService.getCurrentUser()
    .subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
    });
  }
  toggleNavigationMenu() {
    this.layoutService.navigationToggle();
  }
  onLinkClick() {
    this.toggleNavigationMenu();
  }
}
