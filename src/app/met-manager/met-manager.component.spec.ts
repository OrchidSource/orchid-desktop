import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetManagerComponent } from './met-manager.component';

describe('MetManagerComponent', () => {
  let component: MetManagerComponent;
  let fixture: ComponentFixture<MetManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
