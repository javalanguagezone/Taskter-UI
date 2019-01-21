import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetComponent } from './components/time-sheet/timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetComponent
  },
  {
    path: ':year/:month/:day',
    component: TimesheetComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimeSheetRoutingModule { }
