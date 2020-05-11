import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepatmentComponent } from './depatment.component';

describe('DepatmentComponent', () => {
  let component: DepatmentComponent;
  let fixture: ComponentFixture<DepatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
