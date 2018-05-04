import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBackupComponent } from './wallet-backup.component';

describe('WalletBackupComponent', () => {
  let component: WalletBackupComponent;
  let fixture: ComponentFixture<WalletBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
