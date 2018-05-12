import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWalletComponent } from './settings-wallet.component';

describe('SettingsWalletComponent', () => {
  let component: SettingsWalletComponent;
  let fixture: ComponentFixture<SettingsWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
