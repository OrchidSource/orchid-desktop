import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiCheckboxComponent } from './orcui-checkbox.component';

describe('OrcuiCheckboxComponent', () => {
  let component: OrcuiCheckboxComponent;
  let fixture: ComponentFixture<OrcuiCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcuiCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
