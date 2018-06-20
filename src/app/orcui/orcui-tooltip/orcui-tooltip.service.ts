import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * Service used by orcui-tooltip to communicate between the tooltip target and the tooltip.
 * Maybe there's a better way to do this?
 */
@Injectable()
export class OrcuiTooltipService {

  public tooltipHoverBehaviorSubject: BehaviorSubject<boolean>;

  constructor() {
    this.tooltipHoverBehaviorSubject = new BehaviorSubject(false);
  }

  setHoveringTooltip(hovering: boolean): void {
    this.tooltipHoverBehaviorSubject.next(hovering);
  }

}
