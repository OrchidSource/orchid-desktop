import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPurchaseComponent } from './start-purchase.component';

describe('StartPurchaseComponent', () => {
  let component: StartPurchaseComponent;
  let fixture: ComponentFixture<StartPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
