import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBackupBeginComponent } from './wallet-backup-begin.component';

describe('WalletBackupBeginComponent', () => {
  let component: WalletBackupBeginComponent;
  let fixture: ComponentFixture<WalletBackupBeginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBackupBeginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBackupBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
