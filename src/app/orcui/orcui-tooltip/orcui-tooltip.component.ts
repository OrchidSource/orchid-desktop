import { Component, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import { OrcuiTooltipBodyComponent } from '../orcui-tooltip-body/orcui-tooltip-body.component';
import { OrcuiTooltipService } from './orcui-tooltip.service';


/**
 * TODO: document
 */
@Directive({
  selector: '[orcui-tooltip]'
})
export class OrcuiTooltipComponent implements OnInit {

  @Input('orcui-tooltip') tip: string;

  private _overlayRef: OverlayRef;
  private _portal: ComponentPortal<any>;

  constructor(private _overlay: Overlay, private thisElement: ElementRef, private tooltipService: OrcuiTooltipService ) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.tooltipService.hoveringTarget = true;
    console.log('mouse enter!!!; tip: ' + this.tip);
    if (!this._overlayRef) {
      const positionStrategy = this._overlay
        .position()
        .connectedTo(this.thisElement,
          {originX: 'start', originY: 'bottom'},
          {overlayX: 'start', overlayY: 'top'})
      //   .withFallbackPosition(
      //     {originX: 'start', originY: 'top'},
      //     {overlayX: 'start', overlayY: 'bottom'});

      this._overlayRef = this._overlay.create({
        positionStrategy: positionStrategy,
        hasBackdrop: false
      });

      // this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
      // this._portal = new TemplatePortal(this.tip, this._viewContainerRef);
      this._portal = new ComponentPortal(OrcuiTooltipBodyComponent);
    }
    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._portal);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    console.log('mouseleave')
    this.tooltipService.hoveringTarget = false;
    setTimeout(() => {
      console.log('detaching?');
      if (!this.tooltipService.hoveringTooltip) {
        console.log('detaching!');
        this.detachTooltip();
      }
    }, 300);
  }

  private detachTooltip(): void {
    this._overlayRef.detach();
  }

  ngOnInit() {
  }

}
