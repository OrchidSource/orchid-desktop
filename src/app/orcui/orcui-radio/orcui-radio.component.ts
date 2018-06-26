import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

/**
 * A radio button component
 *
 * To use, binding the radio value to "model.value":
 *       <orcui-radio value="Value1" [(ngModel)]="model.value"></ui-radio>
 *       <orcui-radio value="Value2" [(ngModel)]="model.value"></ui-radio>
 */
@Component({
  selector: 'orcui-radio',
  templateUrl: './orcui-radio.component.html',
  styleUrls: ['./orcui-radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: OrcuiRadioComponent,
    multi: true
  }]
})
export class OrcuiRadioComponent implements ControlValueAccessor, OnInit {

  @HostBinding('attr.role') role: string = 'radio';
  @HostBinding('attr.aria-checked') ariaChecked: boolean = false;
  @HostBinding('attr.tabindex') tabindex: string = '0';

  private onChangeFunction: Function;
  private onTouchedFunction: Function;

  isSelected: boolean;

  /**
   * The value the model will have when this radio button is selected
   */
  @Input() value: string;

  constructor() { }

  ngOnInit() {
    if (!this.value) {
      throw new Error("value attribute must be set on orcui-radio");
    }
  }

  @HostListener('click')
  @HostListener('keydown.enter')
  clicked() {
    this.isSelected = true;
    this.onChangeFunction(this.value);
  }

  @HostListener('blur')
  onBlur() {
    if (this.onTouchedFunction) {
      this.onTouchedFunction();
    }
  }

  writeValue(val: string) {
    this.isSelected = val === this.value;
  }

  registerOnChange(fn: Function) {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedFunction = fn;
  }
}
