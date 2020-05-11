import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTransactionComponent } from './tool-transaction.component';

describe('ToolTransactionComponent', () => {
  let component: ToolTransactionComponent;
  let fixture: ComponentFixture<ToolTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
