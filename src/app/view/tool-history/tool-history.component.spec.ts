import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolHistoryComponent } from './tool-history.component';

describe('ToolHistoryComponent', () => {
  let component: ToolHistoryComponent;
  let fixture: ComponentFixture<ToolHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
