import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrcuiTooltipService } from '../orcui-tooltip/orcui-tooltip.service';

@Component({
  selector: 'app-orcui-tooltip-body',
  templateUrl: './orcui-tooltip-body.component.html',
  styleUrls: ['./orcui-tooltip-body.component.scss']
})
export class OrcuiTooltipBodyComponent implements OnInit {

  constructor(private tooltipService: OrcuiTooltipService) { }

  public tip: string = '';
  public tipPlacement: string = 'right';

  /**
   * Click to close
   */
  @HostListener('click') onClick(){
    this.tooltipService.setHoveringTooltip(false);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log('tooltip-body: mouseenter');
    this.tooltipService.setHoveringTooltip(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    console.log('tooltip-body: mouseleave');
    this.tooltipService.setHoveringTooltip(false);
  }

  ngOnInit() {
  }

}
