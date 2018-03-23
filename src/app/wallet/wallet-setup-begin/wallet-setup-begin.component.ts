import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-setup-begin',
  templateUrl: './wallet-setup-begin.component.html',
  styleUrls: ['./wallet-setup-begin.component.scss']
})
export class WalletSetupBeginComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  constructor() { }

  ngOnInit() {
  }

}
