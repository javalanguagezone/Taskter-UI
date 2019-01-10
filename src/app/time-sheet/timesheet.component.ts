import { Component, OnInit } from '@angular/core';
import { TimesheetService, ITimeSheet } from '../services/timesheet.service';
@Component({
  selector: 'tsk-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  timesheets: ITimeSheet[];

  constructor(private timeSheetServices: TimesheetService) { }

  ngOnInit() {
  }

}
