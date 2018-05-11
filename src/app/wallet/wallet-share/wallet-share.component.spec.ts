import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletShareComponent } from './wallet-share.component';

describe('WalletShareComponent', () => {
  let component: WalletShareComponent;
  let fixture: ComponentFixture<WalletShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
