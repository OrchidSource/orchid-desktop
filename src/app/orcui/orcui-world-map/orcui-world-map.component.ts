import { Component, ElementRef, OnChanges, Input, Renderer2 } from '@angular/core';

const SELECTED_CLASS: string = "world-map-selected";

/**
 * Shows a world map, with a country highlighted. The "country-code" attribute
 * takes the two-letter country code to set which country is highlighted.
 *
 * E.g. to select the USA:
 *
 * <orcui-world-map country-code="us"></orcui-world-map>
 *
 */
@Component({
  selector: 'orcui-world-map',
  templateUrl: './orcui-world-map.component.html',
  styleUrls: ['./orcui-world-map.component.scss']
})
export class OrcuiWorldMapComponent implements OnChanges {
  @Input() countryCode: string;

  /** a reference to the currently selected element */
  private selectedElements: HTMLCollection;

  // public className: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnChanges() {
    if (this.selectedElements) {
      for (let i = 0; i < this.selectedElements.length; i++) {
        this.renderer.removeClass(this.selectedElements.item(i), SELECTED_CLASS);
      }
    }

    if (!this.countryCode) {
      return;
    }

    this.selectedElements = this.elementRef.nativeElement.getElementsByClassName(this.countryCode.toLowerCase());

    if (!this.selectedElements) {
      console.warn(`Could not find element for country code '${this.countryCode}'`);
      return;
    }

    for (let i = 0; i < this.selectedElements.length; i++) {
      this.renderer.addClass(this.selectedElements.item(i), SELECTED_CLASS);
    }
  }

}
