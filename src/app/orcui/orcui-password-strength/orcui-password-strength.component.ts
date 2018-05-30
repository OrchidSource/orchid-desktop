import { Component, Input, OnInit } from '@angular/core';

const STRONG_REGEX = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$");
const MEDIUM_REGEX = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
const ENOUGH_REGEX = new RegExp("(?=.{6,}).*");

@Component({
  selector: 'orcui-password-strength',
  templateUrl: './orcui-password-strength.component.html',
  styleUrls: ['./orcui-password-strength.component.scss']
})
export class OrcuiPasswordStrengthComponent implements OnInit {

  public strength: number = 0;
  // TODO: internationalize
  public strengthMap = {
    0: 'weak',
    1: 'weak',
    2: 'moderate',
    3: 'strong',
    4: 'strongest'
  }

  @Input() set password(password: string) {
    this.calculateStrength(password);
  }

  private calculateStrength(password: string) {
    // lifted from https://martech.zone/javascript-password-strength/ and modified
    console.log(`calculating  strength of password "${password}"`)
    if (password.length == 0) {
      this.strength = 0;
    } else if (STRONG_REGEX.test(password)) {
      this.strength = 4
    } else if (MEDIUM_REGEX.test(password)) {
      this.strength = 3;
    } else if (ENOUGH_REGEX.test(password)) {
      this.strength = 2;
    } else {
      this.strength = 1
    }

    console.log('strength was: ' + this.strength);
  }

  constructor() { }

  ngOnInit() {
  }

}
