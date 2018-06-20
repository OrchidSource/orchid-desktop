import {
  Component,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OrcuiTooltipBodyComponent } from '../orcui-tooltip-body/orcui-tooltip-body.component';
import { OrcuiTooltipService } from './orcui-tooltip.service';


/**
 * Directive for adding tooltips
 * TODO: document
 */
@Directive({
  selector: '[orcui-tooltip]'
})
export class OrcuiTooltipComponent implements OnInit {

  @Input('orcui-tooltip') tip: string;

  private overlayRef: OverlayRef;
  // private portal: TemplatePortal<any>;
  private portal: ComponentPortal<any>;

  /**
   * Whether the cursor is hovering over the tooltip icon
   */
  private hovering: boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private overlay: Overlay,
    private thisElement: ElementRef,
    private tooltipService: OrcuiTooltipService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.hovering = true;
    console.log('mouse enter!!!; tip: ' + this.tip);
    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .connectedTo(this.thisElement,
          { originX: 'start', originY: 'bottom' },
          { overlayX: 'start', overlayY: 'top' })
      //   .withFallbackPosition(
      //     {originX: 'start', originY: 'top'},
      //     {overlayX: 'start', overlayY: 'bottom'});

      const tooltipBodyComponent = this.componentFactoryResolver.resolveComponentFactory(OrcuiTooltipBodyComponent);
      const tooltipComponentRef = tooltipBodyComponent.create(this.injector);

      this.overlayRef = this.overlay.create({
        positionStrategy: positionStrategy,
        hasBackdrop: false
      });

      this.portal = new ComponentPortal(OrcuiTooltipBodyComponent);

      // set up the listener for hover over the tooltip
      this.tooltipService.tooltipHoverBehaviorSubject.subscribe((hoveringOverTooltip) => {
        if (!hoveringOverTooltip && !this.hovering) {
          this.detachTooltip();
        }
      });
    }
    if (!this.overlayRef.hasAttached()) {
      let component = this.overlayRef.attach(this.portal);
      component.instance.tip = this.tip;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    console.log('mouseleave');
    this.hovering = false;
    setTimeout(() => {
      console.log('detaching?');
      if (!this.tooltipService.tooltipHoverBehaviorSubject.getValue()) {
        console.log('detaching!');
        this.detachTooltip();
      }
    }, 200);
  }

  private detachTooltip(): void {
    // this.overlayRef.detach();
  }

  ngOnInit() {
  }

}
