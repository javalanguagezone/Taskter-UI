import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LayoutService } from './layout/services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './authorization/services/auth.service';

@Component({
  selector: 'tsk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnDestroy {
  title = 'taskter-ui';

  onDestroy$ = new Subject();
  userMenuOpen: boolean;
  navigationOpen: boolean;

  constructor(private layoutService: LayoutService, private authService: AuthService) {
    this.layoutService
      .onUserProfileToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.userMenuOpen = isOpen));

    this.layoutService
      .onNavigationToggle()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isOpen => (this.navigationOpen = isOpen));
  }

  closeUserProfile() {
    this.layoutService.closeUserProfile();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
