import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaintenanceComponent } from './list-maintenance.component';

describe('ListMaintenanceComponent', () => {
  let component: ListMaintenanceComponent;
  let fixture: ComponentFixture<ListMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
