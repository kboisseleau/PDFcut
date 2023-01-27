import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay'
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core'
import { TemplatePortal } from '@angular/cdk/portal'

@Injectable({
  providedIn: 'root'
})

export class OverlayService {
  constructor (
    private _overlay: Overlay
  ) { }

  public createOverlay (config: OverlayConfig): OverlayRef {
    return this._overlay.create(config)
  }

  public attachTemplatePortal (overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef): void {
    const templatePortal = new TemplatePortal(templateRef, vcRef)
    overlayRef.attach(templatePortal)
  }

  public positionGloballyCenter (): PositionStrategy {
    return this._overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()
  }
}
