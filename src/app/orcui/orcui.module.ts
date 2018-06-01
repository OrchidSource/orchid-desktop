import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcuiPasswordStrengthComponent } from './orcui-password-strength/orcui-password-strength.component';
import { OrcuiCheckboxComponent } from './orcui-checkbox/orcui-checkbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrcuiPasswordStrengthComponent, OrcuiCheckboxComponent],
  exports: [OrcuiPasswordStrengthComponent, OrcuiCheckboxComponent]
})
export class OrcuiModule { }
