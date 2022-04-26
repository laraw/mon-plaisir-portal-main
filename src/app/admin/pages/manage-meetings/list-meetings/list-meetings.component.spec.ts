import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMeetingsComponent } from './list-meetings.component';

describe('ListMeetingsComponent', () => {
  let component: ListMeetingsComponent;
  let fixture: ComponentFixture<ListMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
