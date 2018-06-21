import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiTooltipComponent } from './orcui-tooltip.component';

describe('OrcuiTooltipComponent', () => {
  let component: OrcuiTooltipComponent;
  let fixture: ComponentFixture<OrcuiTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcuiTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
