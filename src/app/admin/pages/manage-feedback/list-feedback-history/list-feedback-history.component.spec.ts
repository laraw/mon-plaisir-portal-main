import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackHistoryComponent } from './list-feedback-history.component';

describe('ListFeedbackHistoryComponent', () => {
  let component: ListFeedbackHistoryComponent;
  let fixture: ComponentFixture<ListFeedbackHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeedbackHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeedbackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
