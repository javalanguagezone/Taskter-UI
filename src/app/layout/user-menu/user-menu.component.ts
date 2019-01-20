import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { MatSidenav } from '@angular/material/sidenav';
import { UserMenuService } from './user-menu.service';

@Component({
  selector: 'tsk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {

  currentUser: User = {} as User;
  @ViewChild('userMenu') public sidenav: MatSidenav = null;

  constructor(private userMenuService: UserMenuService, private userService: UserService) { }

  ngOnInit() {
    this.userMenuService.setSidenav(this.sidenav);
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleMenu() {
    this.userMenuService.toggle();
  }
}
