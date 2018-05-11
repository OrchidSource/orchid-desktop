import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletQrComponent } from './wallet-qr.component';

describe('WalletQrComponent', () => {
  let component: WalletQrComponent;
  let fixture: ComponentFixture<WalletQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
