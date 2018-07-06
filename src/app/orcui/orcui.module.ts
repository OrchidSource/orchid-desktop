import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { OrcuiPasswordStrengthComponent } from './orcui-password-strength/orcui-password-strength.component';
import { OrcuiCheckboxComponent } from './orcui-checkbox/orcui-checkbox.component';
import { OrcuiRadioComponent } from './orcui-radio/orcui-radio.component';
import { OrcuiTooltipComponent } from './orcui-tooltip/orcui-tooltip.component';
import { OrcuiTooltipBodyComponent } from './orcui-tooltip-body/orcui-tooltip-body.component';
import { OrcuiTooltipService } from './orcui-tooltip/orcui-tooltip.service';
import { OrcuiToggleComponent } from './orcui-toggle/orcui-toggle.component';
import { OrcuiWorldMapComponent } from './orcui-world-map/orcui-world-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule
  ],
  declarations: [
    OrcuiPasswordStrengthComponent,
    OrcuiCheckboxComponent,
    OrcuiRadioComponent,
    OrcuiToggleComponent,
    OrcuiTooltipComponent,
    OrcuiTooltipBodyComponent,
    OrcuiWorldMapComponent
  ],
  exports: [
    OrcuiPasswordStrengthComponent,
    OrcuiCheckboxComponent,
    OrcuiRadioComponent,
    OrcuiToggleComponent,
    OrcuiTooltipComponent,
    OrcuiWorldMapComponent
  ],
  entryComponents: [OrcuiTooltipBodyComponent],
  providers: [OrcuiTooltipService]
})
export class OrcuiModule { }
