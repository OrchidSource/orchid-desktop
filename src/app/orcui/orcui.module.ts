import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrcuiPasswordStrengthComponent } from './orcui-password-strength/orcui-password-strength.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrcuiPasswordStrengthComponent],
  exports: [OrcuiPasswordStrengthComponent]
})
export class OrcuiModule { }
