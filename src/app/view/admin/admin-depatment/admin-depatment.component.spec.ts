import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepatmentComponent } from './admin-depatment.component';

describe('AdminDepatmentComponent', () => {
  let component: AdminDepatmentComponent;
  let fixture: ComponentFixture<AdminDepatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDepatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDepatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
