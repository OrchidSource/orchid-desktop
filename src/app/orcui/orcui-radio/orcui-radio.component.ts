import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * A radio button component
 *
 * To use, binding the radio value to "model.value":
 *       <orcui-radio value="Value1" [(model)]="model.value"></ui-radio>
 *       <orcui-radio value="Value2" [(model)]="model.value"></ui-radio>
 */
@Component({
  selector: 'orcui-radio',
  templateUrl: './orcui-radio.component.html',
  styleUrls: ['./orcui-radio.component.scss']
})
export class OrcuiRadioComponent implements OnInit {

  /**
   * The value the model will have when this radio button is selected
   */
  @Input() value: any;
  /**
   * The model holding the value
   * @return [description]
   */
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  selected: boolean;

  constructor() { }

  ngOnInit() {
    this.selected = this.model === this.value;
  }

  radioSelected() {
    // this.model = this.value;
    this.modelChange.emit(this.value);
  }

}
