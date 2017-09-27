import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHowToComponent } from './purchase-how-to.component';

describe('PurchaseHowToComponent', () => {
  let component: PurchaseHowToComponent;
  let fixture: ComponentFixture<PurchaseHowToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseHowToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHowToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
