import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiTooltipBodyComponent } from './orcui-tooltip-body.component';

describe('OrcuiTooltipBodyComponent', () => {
  let component: OrcuiTooltipBodyComponent;
  let fixture: ComponentFixture<OrcuiTooltipBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcuiTooltipBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiTooltipBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
