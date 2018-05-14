import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * A radio button component
 *
 * To use, binding the radio value to "model.value":
 *       <ui-radio value="Value1" [(model)]="model.value"></ui-radio>
 *       <ui-radio value="Value2" [(model)]="model.value"></ui-radio>
 */
@Component({
  selector: 'ui-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  /**
   * The value the model will have when this radio button is selected
   */
  @Input() value: any;
  /**
   * The model holding the value
   * @return [description]
   */
  @Input() model: any;
  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();

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
