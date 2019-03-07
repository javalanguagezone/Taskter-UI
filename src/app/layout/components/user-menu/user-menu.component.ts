import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../services/layout.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authorization/services/auth.service';

@Component({
  selector: 'tsk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  loggedInUser$: Observable<any>;
  constructor(private layoutService: LayoutService, private authService: AuthService) {}

  ngOnInit() {
    this.loggedInUser$ = this.authService.getUserProfile();
  }

  closeUserMenu() {
    this.layoutService.closeUserProfile();
  }

  logout() {
    this.authService.startLogout();
  }
}
