import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolOutComponent } from './tool-out.component';

describe('ToolOutComponent', () => {
  let component: ToolOutComponent;
  let fixture: ComponentFixture<ToolOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
