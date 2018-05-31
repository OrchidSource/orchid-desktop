import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// regexps have state in javascript, so making them constants is maybe a bad idea
const STRONG_REGEX = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$");
const MEDIUM_REGEX = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
const ENOUGH_REGEX = new RegExp("(?=.{6,}).*");

@Component({
  selector: 'orcui-password-strength',
  templateUrl: './orcui-password-strength.component.html',
  styleUrls: ['./orcui-password-strength.component.scss']
})
export class OrcuiPasswordStrengthComponent implements OnInit {

  @Input() set password(password: string) {
    this.calculateStrength(password);
  }

  /**
   * If you want to translate the strength name, pass in a function that takes the English word from this.strengthMap and returns the translated string
   * returns a string
   */
  @Input() translateFunction: (number) => Observable<String>;

  public strength: number = 0;
  public strengthName: String;
  public strengthMap = {
    0: 'Weak',
    1: 'Weak',
    2: 'Moderate',
    3: 'Strong',
    4: 'Strongest'
  }

  private calculateStrength(password: string) {
    // lifted from https://martech.zone/javascript-password-strength/ and modified
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
    if (this.translateFunction) {
      this.translateFunction(this.strengthMap[this.strength]).subscribe(name => {
        this.strengthName = name;
      },
      error => {
        this.strengthName = this.strengthMap[this.strength];
      }
    );
    } else {
      this.strengthName = this.strengthMap[this.strength];
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
