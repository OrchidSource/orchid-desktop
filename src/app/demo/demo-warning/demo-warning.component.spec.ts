import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoWarningComponent } from './demo-warning.component';

describe('DemoWarningComponent', () => {
  let component: DemoWarningComponent;
  let fixture: ComponentFixture<DemoWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
