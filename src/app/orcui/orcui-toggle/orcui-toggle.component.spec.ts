import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiToggleComponent } from './orcui-toggle.component';

describe('OrcuiToggleComponent', () => {
  let component: OrcuiToggleComponent;
  let fixture: ComponentFixture<OrcuiToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrcuiToggleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
