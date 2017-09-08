import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PurchaseCart } from '../purchase-cart';
import { CardValidators } from '../card-validators';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styleUrls: ['./purchase-confirmation.component.scss'],
  host: {class: 'modal-host'}
})
export class PurchaseConfirmationComponent implements OnInit {
constructor() { }

ngOnInit() {
}
}
