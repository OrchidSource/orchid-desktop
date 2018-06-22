import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'orcui-toggle',
  templateUrl: './orcui-toggle.component.html',
  styleUrls: ['./orcui-toggle.component.scss']
})
export class OrcuiToggleComponent {

  @Input() isSelected: boolean;
  @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  toggleChanged() {
    this.isSelectedChange.emit(this.isSelected);
  }

}
