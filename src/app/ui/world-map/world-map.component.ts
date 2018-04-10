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
  private selectedElement: any = false;

  public className: string;

  constructor(private renderer: Renderer2, private elementRef : ElementRef) {
  }

  ngOnChanges() {
    console.log('changes:', arguments);
    if (this.selectedElement) {
      this.renderer.removeClass(this.selectedElement, SELECTED_CLASS);
    }
    this.selectedElement = this.elementRef.nativeElement.querySelector("[cc='" + this.countryCode + "']");
    if (!this.selectedElement) {
      console.warn(`Could not find element for country code '${this.countryCode}'`);
      return;
    }
    this.renderer.addClass(this.selectedElement, SELECTED_CLASS);
  }

}
