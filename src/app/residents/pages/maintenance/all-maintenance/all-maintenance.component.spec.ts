import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaintenanceComponent } from './all-maintenance.component';

describe('AllMaintenanceComponent', () => {
  let component: AllMaintenanceComponent;
  let fixture: ComponentFixture<AllMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
