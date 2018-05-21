import { Component, ElementRef, OnChanges, Input, Renderer2 } from '@angular/core';

const SELECTED_CLASS: string = "world-map-selected";

/**
 * Shows a world map. The "country-code" attribute sets which country is highlighted.
 *
 * E.g. to select the USA:
 *
 * <world-map country-code="us"></world-map>
 *
 */
@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnChanges {
  @Input() countryCode: string;

  /** a reference to the currently selected element */
  private selectedElements: any = false;

  public className: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnChanges() {
    if (this.selectedElements) {
      for (let i = 0; i < this.selectedElements.length; i++) {
        this.renderer.removeClass(this.selectedElements.item(i), SELECTED_CLASS);
      }
    }

    console.log("the countryCode:" + this.countryCode);

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
