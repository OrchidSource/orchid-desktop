import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { OrcuiTooltipService } from '../orcui-tooltip/orcui-tooltip.service';

@Component({
  selector: 'app-orcui-tooltip-body',
  templateUrl: './orcui-tooltip-body.component.html',
  styleUrls: ['./orcui-tooltip-body.component.scss']
})
export class OrcuiTooltipBodyComponent {

  constructor(private tooltipService: OrcuiTooltipService) { }

  public tip: string = '';
  public tipPlacement: string = 'right';

  public pointAtXCoordinate: number;
  public pointAtYCoordinate: number;

  /**
   * Click to close
   */
  @HostListener('click') onClick() {
    this.tooltipService.setHoveringTooltip(false);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.tooltipService.setHoveringTooltip(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.tooltipService.setHoveringTooltip(false);
  }

  /**
   * Set the pointer position
   * @return [description]
   */
  pointerStyle() {
    // For now, we only position the pointer by location in the "top" and "bottom" configurations
    if (this.pointAtXCoordinate && this.pointAtXCoordinate) {
      let top = this.tipPlacement === 'bottom' ? (this.pointAtYCoordinate + 7) : (this.pointAtYCoordinate - 20);
      return {
        position: 'fixed',
        top: `${top}px`,
        left: `${this.pointAtXCoordinate}px`
      }
    } else {
      return {};
    }

  }

}
