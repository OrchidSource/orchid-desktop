import {
  Component,
  HostBinding,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

/**
 * Toggle component.
 *
 * Example:
 *
 *  <form #form="ngForm">
 *    <label id="id_of_label">Description of toggle</label>
 *    <orcui-toggle [ngModel]="initial_model_value" name="model_name" aria-labelledby="id_of_label"></orcui-toggle>
 *  </form>
 */
@Component({
  selector: 'orcui-toggle',
  templateUrl: './orcui-toggle.component.html',
  styleUrls: ['./orcui-toggle.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: OrcuiToggleComponent,
    multi: true
  }]
})
export class OrcuiToggleComponent implements ControlValueAccessor {

  @HostBinding('attr.role') role: string = 'checkbox';
  @HostBinding('attr.aria-checked') ariaChecked: boolean = false;
  @HostBinding('attr.tabindex') tabindex: string = '0';

  isSelected: boolean;

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() { }

  @HostListener('blur')
  onBlur() {
    if (this.onTouchedFunction) {
      this.onTouchedFunction();
    }
  }

  @HostListener('keydown.enter')
  @HostListener('click')
  onClick() {
    console.log('clicked');
    this.setChecked(!this.isSelected)
    if (this.onChangeFunction) {
      this.onChangeFunction(this.isSelected);
    }
  }

  registerOnChange(fn: Function) {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedFunction = fn;
  }

  writeValue(val: boolean) {
    this.setChecked(val);
  }

  setChecked(checked: boolean) {
    this.isSelected = checked;
    this.ariaChecked = this.isSelected;
  }

}
