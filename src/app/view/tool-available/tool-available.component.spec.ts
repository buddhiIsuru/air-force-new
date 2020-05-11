import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolAvailableComponent } from './tool-available.component';

describe('ToolAvailableComponent', () => {
  let component: ToolAvailableComponent;
  let fixture: ComponentFixture<ToolAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
