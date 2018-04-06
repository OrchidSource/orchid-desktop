import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSetupBeginComponent } from './wallet-setup-begin.component';

describe('WalletSetupBeginComponent', () => {
  let component: WalletSetupBeginComponent;
  let fixture: ComponentFixture<WalletSetupBeginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletSetupBeginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletSetupBeginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
