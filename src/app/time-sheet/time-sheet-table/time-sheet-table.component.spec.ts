import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetTableComponent } from './time-sheet-table.component';

describe('TimeSheetTableComponent', () => {
  let component: TimeSheetTableComponent;
  let fixture: ComponentFixture<TimeSheetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
