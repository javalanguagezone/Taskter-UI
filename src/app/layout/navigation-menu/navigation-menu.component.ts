import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
import { NavigationMenuService } from './navigation-menu.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'tsk-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  loggedInUser: User = null;
  @ViewChild('navigationMenu') public sidenav: MatSidenav;
  constructor(private userService: UserService, private sidenavService: NavigationMenuService) { }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.userService.getCurrentUser()
    .subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
    });
  }

}
