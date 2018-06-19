import { Injectable } from '@angular/core';
/**
 * Service used by orcui-tooltip to communicate between the tooltip target and the tooltip.
 * Maybe there's a better way to do this?
 */
@Injectable()
export class OrcuiTooltipService {

  public hoveringTooltip: boolean = false;
  public hoveringTarget: boolean = false;

  constructor() { }

}
