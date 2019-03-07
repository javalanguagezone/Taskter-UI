import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authorization/services/auth.service';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'tsk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleActive: Boolean = false;
  loggedInUser$: Observable<any>;
  constructor(private layoutService: LayoutService, private authService: AuthService) {}

  ngOnInit() {
    this.loggedInUser$ = this.authService.getUserProfile();
  }

  openUserProfile() {
    this.layoutService.openUserProfile();
  }

  toggleNavigationMenu() {
    this.layoutService.navigationToggle();
  }
}
