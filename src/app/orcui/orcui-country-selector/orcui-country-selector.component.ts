import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'orcui-country-selector',
  templateUrl: './orcui-country-selector.component.html',
  styleUrls: ['./orcui-country-selector.component.scss'],
})
export class OrcuiCountrySelectorComponent implements OnInit {

  // Expose as a focusable input element
  @HostBinding('attr.role') role: string = 'combobox';
  @HostBinding('attr.tabindex') tabindex: string = '0';

  /**
   * The selected item
   */
  @Input() selected: any;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  public searchResults: any[];

  /**
   * Function to call to search for items. Should either return an array of items,
   * or a promise that resolves with an array of items
   */
  @Input('searchFunction') searchFunction: Function;

  @ContentChild('resultTemplate') resultTemplate: TemplateRef<ElementRef>;

  @ViewChild('searchTemplate') searchTemplate: TemplateRef<any>;

  private overlayRef: OverlayRef;
  templatePortal: TemplatePortal;

  public searchText: string;
  public searchTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private overlay: Overlay,
    private thisElement: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {
    // debounce the search text so we don't run a search on each keypress
    this.searchTextChanged.debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(search => {
        this.searchFunction(this.searchText).then((results) => {
          this.searchResults = results;
        })
      });
  }

  ngOnInit() {
  }

  @HostListener('keydown.space')
  @HostListener('click')
  open() {

    const positionStrategy = this.overlay
      .position()
      .connectedTo(
        this.thisElement,
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'top' }
      )
      .withOffsetX(0)  // TODO
      .withOffsetY(0); // TODO

    this.overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: false
    });

    this.templatePortal = new TemplatePortal(
      this.searchTemplate,
      this.viewContainerRef,
      { $implicit: 'Bob' },
    );

    this.overlayRef.attach(this.templatePortal);
  }

  @HostListener('keydown.Escape')
  close() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  @HostListener('document:click', ['$event'])
  /**
  * Close the pop-up if the user clicked outside of the element
  */
  documentClick(evt) {
    if (!this.thisElement.nativeElement.contains(event.target) &&
        (this.overlayRef && !this.overlayRef.overlayElement.contains(evt.target)
    )) {
      this.close();
    }
  }

  /**
   * Call to select the item
   * @param  item The item to set as the value of this.selected
   */
  selectItem(item: any) {
    this.selected = item;
    this.selectedChange.emit(this.selected);
    this.close();
  }

  /**
   * Run the search. Will be debounced
   */
  search() {
    this.searchTextChanged.next(this.searchText);
  }

}
