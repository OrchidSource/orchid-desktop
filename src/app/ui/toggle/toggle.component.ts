import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'ui-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {

  @Input() isSelected:boolean;
  @Output() isSelectedChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  toggleChanged() {
    this.isSelectedChange.emit(this.isSelected);
  }

}
