import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmessagesComponent } from './sendmessages.component';

describe('SendmessagesComponent', () => {
  let component: SendmessagesComponent;
  let fixture: ComponentFixture<SendmessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendmessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
