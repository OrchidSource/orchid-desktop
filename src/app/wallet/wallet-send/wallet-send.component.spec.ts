import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSendComponent } from './wallet-send.component';

describe('WalletSendComponent', () => {
  let component: WalletSendComponent;
  let fixture: ComponentFixture<WalletSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
