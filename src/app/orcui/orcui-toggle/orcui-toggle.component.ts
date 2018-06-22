import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'orcui-toggle',
  templateUrl: './orcui-toggle.component.html',
  styleUrls: ['./orcui-toggle.component.scss']
})
export class OrcuiToggleComponent implements OnInit {

  @HostBinding('attr.role') role: string = 'checkbox';
  @HostBinding('attr.aria-checked') ariaChecked: boolean = false;
  @HostBinding('attr.tabindex') tabindex: string = '0';

  @Input('orcui-toggle-labelledby') labelledby: string;

  @Input() isSelected: boolean;
  @Output() isSelectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.ariaChecked = this.isSelected;
  }

  @HostListener('click')
  onClick() {
    this.isSelected = !this.isSelected;
    this.ariaChecked = this.isSelected;
    this.isSelectedChange.emit(this.isSelected);
  }

  /**
   * Changes the value if the toggle has focus and the user clicks the enter key
   */
  @HostListener('keydown.enter')
  onFocusedEnter() {
    this.onClick();
  }

}
