import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-wallet-backup-begin',
  templateUrl: './wallet-backup-begin.component.html',
  styleUrls: ['./wallet-backup-begin.component.scss'],
  host: { class: 'routed-modal divided-dialog' }
})
export class WalletBackupBeginComponent implements OnInit {

  // private minPasswordLength: number = 8;

  public walletBackupBeginForm: FormGroup;

  public translateStrength:(strength: string) => Observable<String>;

  @Input() password:string;
  @Output() passwordChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private translateService: TranslateService) {

    this.translateStrength = (strength: string): Observable<String> => {
      return this.translateService.get(`ORCUI.PASSWORD_STRENGTH.${strength.toUpperCase()}`);
    }

  }

  ngOnInit() {

    this.walletBackupBeginForm = new FormGroup({
      password: new FormControl('', [Validators.required]), // Validators.minLength(this.minPasswordLength)
      passwordConfirm: new FormControl('', [Validators.required])
    },
    this.passwordMatchValidator
  );
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: any }{
    if (control.get('password').value != control.get('passwordConfirm').value) {
      return {passwordMatch: "passwords must match"}
    }
    return null;
  }

  // translateStrength(strength: string): Observable<String> {
  //   return this.translateService.get(strength.toUpperCase());
  // }


  walletSetupBeginSubmit() {
    this.passwordChange.emit(this.walletBackupBeginForm.value.password)
  }

}
