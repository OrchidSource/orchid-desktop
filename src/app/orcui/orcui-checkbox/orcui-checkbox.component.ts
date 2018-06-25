import { Component, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'orcui-checkbox',
  templateUrl: './orcui-checkbox.component.html',
  styleUrls: ['./orcui-checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: OrcuiCheckboxComponent,
    multi: true
  }]
})
export class OrcuiCheckboxComponent implements ControlValueAccessor {


  @HostBinding('attr.role') role: string = 'checkbox';
  @HostBinding('attr.aria-checked') ariaChecked: boolean = false;
  @HostBinding('attr.tabindex') tabindex: string = '0';

  isChecked: boolean;
  @Input() text: String;

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  constructor() { }

  registerOnChange(fn: Function) {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedFunction = fn;
  }

  writeValue(selected: boolean) {
    this.isChecked = selected;
  }


  @HostListener('click')
  @HostListener('keydown.enter')
  clicked() {
    this.isChecked = !this.isChecked;
    console.log('clicked; value:', this.isChecked);
    this.onChangeFunction(this.isChecked);
  }


  @HostListener('blur')
  onBlur() {
    if (this.onTouchedFunction) {
      this.onTouchedFunction();
    }
  }

}
