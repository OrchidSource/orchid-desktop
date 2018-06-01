import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'orcui-checkbox',
  templateUrl: './orcui-checkbox.component.html',
  styleUrls: ['./orcui-checkbox.component.scss']
})
export class OrcuiCheckboxComponent implements OnInit {

  @Input() isChecked: boolean;
  @Output() isCheckedChange:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() text: String;

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }

}
