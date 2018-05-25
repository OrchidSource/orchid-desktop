import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBackupPasswordConfirmComponent } from './wallet-backup-password-confirm.component';

describe('WalletBackupPasswordConfirmComponent', () => {
  let component: WalletBackupPasswordConfirmComponent;
  let fixture: ComponentFixture<WalletBackupPasswordConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBackupPasswordConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBackupPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
