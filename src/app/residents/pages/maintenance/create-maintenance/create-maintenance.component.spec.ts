import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaintenanceComponent } from './create-maintenance.component';

describe('CreateMaintenanceComponent', () => {
  let component: CreateMaintenanceComponent;
  let fixture: ComponentFixture<CreateMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
