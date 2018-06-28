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
 * Distance between the tooltip target and the tooltip
 */
const ARROW_OFFSET: number = 20;

/**
 *  The keys in this object are the valid arguments to orcui-tooltip-placement
 */
const TIP_CONFIG = {
  right: {
    origin: { originX: 'end', originY: 'top' },
    overlay: { overlayX: 'start', overlayY: 'top' },
    offsetX: ARROW_OFFSET,
    offsetY: -10
  },
  left: {
    origin: { originX: 'start', originY: 'top' },
    overlay: { overlayX: 'end', overlayY: 'top' },
    offsetX: -ARROW_OFFSET,
    offsetY: -10
  },
  bottom: {
    origin: { originX: 'center', originY: 'bottom' },
    overlay: { overlayX: 'center', overlayY: 'top' },
    offsetX: 0,
    offsetY: ARROW_OFFSET
  },
  top: {
    origin: { originX: 'center', originY: 'top' },
    overlay: { overlayX: 'center', overlayY: 'bottom' },
    offsetX: 0,
    offsetY: -ARROW_OFFSET
  },
};

/**
 * Directive for adding tooltips to an element
 * Usage:
 *
 *     <a orcui-tooltip="'This is the tooltip text'" orcui-placement="bottom">tip?</a>
 */
@Directive({
  selector: '[orcui-tooltip]'
})
export class OrcuiTooltipComponent implements OnInit {

  /**
   * The text to show in the tooltip
   */
  @Input('orcui-tooltip') tip: string;
  /**
   * Where to position the tooltip relative to the target.
   *  'left' | 'right' | 'top' | 'bottom'
   * Defaults to 'right'
   */
  @Input('orcui-tooltip-placement') tipPlacement: string;


  private overlayRef: OverlayRef;
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

    // Only show the tooltip if the cursor has been hovering over the target
    // for a little bit of time
    setTimeout(() => {
      if (this.hovering) {
        this.attachTooltip()
      }
    }, 300);

  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hovering = false;
    setTimeout(() => {
      if (!this.tooltipService.tooltipHoverBehaviorSubject.getValue()) {
        this.detachTooltip();
      }
    }, 200);
  }

  private attachTooltip(): void {
    this.tipPlacement = TIP_CONFIG[this.tipPlacement] ? this.tipPlacement : 'right';

    if (!this.overlayRef) {
      const config = TIP_CONFIG[this.tipPlacement];
      const positionStrategy = this.overlay
        .position()
        .connectedTo(
          this.thisElement,
          config.origin,
          config.overlay
        )
        .withOffsetX(config.offsetX)
        .withOffsetY(config.offsetY);
      //   .withFallbackPosition(
      //     {originX: 'start', originY: 'top'},
      //     {overlayX: 'start', overlayY: 'bottom'});

      const tooltipBodyComponent = this.componentFactoryResolver.resolveComponentFactory(OrcuiTooltipBodyComponent);
      const tooltipComponentRef = tooltipBodyComponent.create(this.injector);

      this.overlayRef = this.overlay.create({
        positionStrategy: positionStrategy,
        hasBackdrop: false
      });

      // this.overlayRef.hostElement;

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
      component.instance.tipPlacement = this.tipPlacement;
    }
  }

  private detachTooltip(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  ngOnInit() {
  }

}
