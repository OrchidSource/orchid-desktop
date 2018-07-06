import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcuiWorldMapComponent } from './orcui-world-map.component';

describe('OrcuiWorldMapComponent', () => {
  let component: WorldMapComponent;
  let fixture: ComponentFixture<WorldMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrcuiWorldMapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcuiWorldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
