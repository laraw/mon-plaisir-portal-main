import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaintenanceComponent } from './update-maintenance.component';

describe('UpdateMaintenanceComponent', () => {
  let component: UpdateMaintenanceComponent;
  let fixture: ComponentFixture<UpdateMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
