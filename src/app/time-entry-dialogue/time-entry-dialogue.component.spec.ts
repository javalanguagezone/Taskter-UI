import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryDialogueComponent } from './time-entry-dialogue.component';

describe('TimeEntryDialogueComponent', () => {
  let component: TimeEntryDialogueComponent;
  let fixture: ComponentFixture<TimeEntryDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEntryDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEntryDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
