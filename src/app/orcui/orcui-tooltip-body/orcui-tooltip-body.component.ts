import { Component, HostListener, OnInit } from '@angular/core';
import { OrcuiTooltipService } from '../orcui-tooltip/orcui-tooltip.service';

@Component({
  selector: 'app-orcui-tooltip-body',
  templateUrl: './orcui-tooltip-body.component.html',
  styleUrls: ['./orcui-tooltip-body.component.scss']
})
export class OrcuiTooltipBodyComponent implements OnInit {

  constructor(private tooltipService: OrcuiTooltipService) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.tooltipService.hoveringTooltip = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    // TODO: trigger event to indicate 
    this.tooltipService.hoveringTooltip = false;
  }

  ngOnInit() {
  }

}
