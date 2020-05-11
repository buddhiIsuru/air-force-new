import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTechnicianComponent } from './admin-technician.component';

describe('AdminTechnicianComponent', () => {
  let component: AdminTechnicianComponent;
  let fixture: ComponentFixture<AdminTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
