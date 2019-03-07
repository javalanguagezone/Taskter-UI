import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authorization/services/auth.service';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'tsk-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  loggedInUser$: Observable<any>;

  constructor(private layoutService: LayoutService, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUser$ = this.authService.getUserProfile();
  }
  toggleNavigationMenu() {
    this.layoutService.navigationToggle();
  }
}
