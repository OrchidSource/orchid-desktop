import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OrcuiPasswordStrengthComponent } from './orcui-password-strength/orcui-password-strength.component';
import { OrcuiCheckboxComponent } from './orcui-checkbox/orcui-checkbox.component';
import { OrcuiTooltipComponent } from './orcui-tooltip/orcui-tooltip.component';
import { OrcuiTooltipBodyComponent } from './orcui-tooltip-body/orcui-tooltip-body.component';
import { OrcuiTooltipService } from './orcui-tooltip/orcui-tooltip.service';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [OrcuiPasswordStrengthComponent, OrcuiCheckboxComponent, OrcuiTooltipComponent, OrcuiTooltipBodyComponent],
  exports: [OrcuiPasswordStrengthComponent, OrcuiCheckboxComponent, OrcuiTooltipComponent],
  entryComponents: [OrcuiTooltipBodyComponent],
  providers: [OrcuiTooltipService]

})
export class OrcuiModule { }
