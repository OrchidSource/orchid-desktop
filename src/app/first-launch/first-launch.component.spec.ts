import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLaunchComponent } from './first-launch.component';

describe('FirstLaunchComponent', () => {
  let component: FirstLaunchComponent;
  let fixture: ComponentFixture<FirstLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
