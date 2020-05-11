import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolInComponent } from './tool-in.component';

describe('ToolInComponent', () => {
  let component: ToolInComponent;
  let fixture: ComponentFixture<ToolInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
