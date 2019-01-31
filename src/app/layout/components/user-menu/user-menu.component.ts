import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { LayoutService } from '../../services/layout.service';
@Component({
  selector: 'tsk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {

  currentUser: User = {} as User;
  constructor(private userService: UserService, private layoutService: LayoutService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  closeUserMenu() {
    this.layoutService.closeUserProfile();
  }
}
