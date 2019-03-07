import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './authorization/services/auth-guard.service';
import { AuthCallbackComponent } from './authorization/components/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: 'timeSheet',
    loadChildren: './time-sheet/time-sheet.module#TimeSheetModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'adminPanel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule',
    canActivate: [AuthGuardService]

  },
  {
    path: '',
    redirectTo: 'timeSheet',
    pathMatch: 'full'
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
