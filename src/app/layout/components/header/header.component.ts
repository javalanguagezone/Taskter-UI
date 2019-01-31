import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { LayoutService } from 'src/app/layout/services/layout.service';


@Component({
  selector: 'tsk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedInUser: User = null;
  toggleActive: Boolean = false;
  constructor(private userService: UserService, private layoutService: LayoutService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => {
        this.loggedInUser = user;
      });
  }

  openUserProfile() {
    this.layoutService.openUserProfile();
  }

  toggleNavigationMenu() {
    this.layoutService.navigationToggle();
  }

}
