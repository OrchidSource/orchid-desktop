import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PurchaseCart } from '../purchase-cart';
import { CardValidators } from '../card-validators';

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.scss'],
  host: {class: 'modal-host'}
})
export class PurchasePaymentComponent implements OnInit {

  token_purchase_cart = PurchaseCart;

  payment_forms: {
    credit_card: FormGroup,
    paypal: FormGroup,
    cryptocurrency: FormGroup
  } = {
    credit_card: null,
    paypal: null,
    cryptocurrency: null
  };

  selected_form: FormGroup;

  constructor() {
    console.log(CardValidators);
    this.build_forms();
  }

  build_forms() {
    this.payment_forms.credit_card = new FormGroup(
      {
        'name': new FormControl('', Validators.required),
        'number': new FormControl('', [Validators.required, CardValidators.number]),
        'expiration_date': new FormControl('', Validators.required),
        'security_code': new FormControl('', Validators.required),
        'zip_code': new FormControl('', Validators.required),
        'save_info': new FormControl(false)
      },
      (function() {
        return function(formGroup: FormGroup) {
          // validate stuff that requires looking at more than one input
          return null;
        }
      })()
    );
    this.payment_forms.paypal = new FormGroup({});
    this.payment_forms.cryptocurrency = new FormGroup({});
    this.selected_form = this.payment_forms.credit_card;
  }

  ngOnInit() {

  }

}
