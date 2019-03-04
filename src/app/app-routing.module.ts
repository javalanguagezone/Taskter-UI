import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/time-sheet', pathMatch: 'full' },

  {
    path: 'timeSheet',
    loadChildren: './time-sheet/time-sheet.module#TimeSheetModule'
  },
  {
    path: 'adminPanel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
