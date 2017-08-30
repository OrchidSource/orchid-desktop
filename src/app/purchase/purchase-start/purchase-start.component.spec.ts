import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseStartComponenet } from './purchase-start.component';

describe('StartPurchaseComponent', () => {
  let component: PurchaseStartComponenet;
  let fixture: ComponentFixture<PurchaseStartComponenet>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseStartComponenet ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseStartComponenet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
