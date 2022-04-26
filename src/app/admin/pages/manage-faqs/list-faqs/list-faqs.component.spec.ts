import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaqsComponent } from './list-faqs.component';

describe('ListFaqsComponent', () => {
  let component: ListFaqsComponent;
  let fixture: ComponentFixture<ListFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFaqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
