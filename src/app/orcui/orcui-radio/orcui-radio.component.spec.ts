import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiRadioComponent } from './orcui-radio.component';

describe('OrcuiRadioComponent', () => {
  let component: OrcuiRadioComponent;
  let fixture: ComponentFixture<OrcuiRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrcuiRadioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
