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

  build_form() {
    this.payment_form = new FormGroup(
      {
        'credit_card_name': new FormControl(''),
        'credit_card_number': new FormControl(''),
        'credit_card_expiration_date': new FormControl(''),
        'credit_card_security_code': new FormControl(''),
        'credit_card_zip_code': new FormControl(''),
        'credit_card_save_info': new FormControl(false),
        'payment_type': new FormControl(PTYPES.CREDIT_CARD)
      },
      (function() {
        var ptypes = PTYPES;
        return function(formGroup: FormGroup) {
          var missing = {};
          if (formGroup.get('payment_type').value === ptypes.CREDIT_CARD) {
            var cc_required = ['credit_card_name', 'credit_card_number', 'credit_card_zip_code', 'credit_card_security_code', 'credit_card_expiration_date'];
            cc_required.forEach((r) => {
              if (!formGroup.get(r).value) {
                missing[r] = 'required';
              }
            })
          } else if (formGroup.get('payment_type').value === ptypes.PAYPAL) {

          } else if (formGroup.get('payment_type').value === ptypes.CRYPTOCURRENCY) {
          }

          if (Object.keys(missing).length > 0) {
            return missing;
          }
          return null;
        }
      })()
    );
  }

  ngOnInit() {

  }

}
