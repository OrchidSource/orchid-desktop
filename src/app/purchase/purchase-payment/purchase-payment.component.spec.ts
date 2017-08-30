import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentComponent } from './purchase-payment.component';

describe('PurchasePaymentComponent', () => {
  let component: PurchasePaymentComponent;
  let fixture: ComponentFixture<PurchasePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
