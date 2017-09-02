import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PurchaseCart } from '../purchase-cart';

// TODO: we've got enums now; use those
const PTYPES = {
  CREDIT_CARD: 'CREDIT_CARD',
  PAYPAL: 'PAYPAL',
  CRYPTOCURRENCY: 'CRYPTOCURRENCY'
}

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.scss'],
  host: {class: 'modal-host'}
})
export class PurchasePaymentComponent implements OnInit {

  PAYMENT_TYPES = PTYPES;
  token_purchase_cart = PurchaseCart;

  payment_form: FormGroup;

  constructor() {
    this.build_form();
  }

  requiredFactory = function(for_payment_type: string, payment_type_form_control: FormControl) {
    return function(control: AbstractControl) {
      console.log('ptfc', control);
      if (for_payment_type !== payment_type_form_control.value) {
        console.log('valid');
        return null;
      }
      if (!control.value || control.value.length === 0) {
        console.log('INVALID');
        return {er: "required"}
      } else {
        console.log('valid');
        return null;
      }
    }
  }

  build_form() {
    let payment_type_form_control = new FormControl(PTYPES.CREDIT_CARD);
    this.payment_form = new FormGroup({
      'credit_card_name': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD, payment_type_form_control)),
      'credit_card_number': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD, payment_type_form_control)),
      'credit_card_expiration_date': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD, payment_type_form_control)),
      'credit_card_security_code': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD, payment_type_form_control)),
      'credit_card_zip_code': new FormControl('', this.requiredFactory(PTYPES.CREDIT_CARD, payment_type_form_control)),
      'credit_card_save_info': new FormControl(false),
      'payment_type': payment_type_form_control
    });
  }

  ngOnInit() {

  }

}
