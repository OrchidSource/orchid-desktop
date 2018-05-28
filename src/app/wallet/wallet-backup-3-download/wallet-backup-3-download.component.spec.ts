import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBackup3DownloadComponent } from './wallet-backup-3-download.component';

describe('WalletBackup3DownloadComponent', () => {
  let component: WalletBackup3DownloadComponent;
  let fixture: ComponentFixture<WalletBackup3DownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletBackup3DownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletBackup3DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
