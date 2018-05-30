import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiPasswordStrengthComponent } from './orcui-password-strength.component';

describe('OrcuiPasswordStrengthComponent', () => {
  let component: OrcuiPasswordStrengthComponent;
  let fixture: ComponentFixture<OrcuiPasswordStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcuiPasswordStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiPasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
