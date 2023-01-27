import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core'
import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay'
import { OverlayService } from '../../services/overlay/overlay.service'
import { ThemePalette } from '@angular/material/core'
import { ProgressSpinnerMode } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-progess-spinner',
  templateUrl: './progess-spinner.component.html',
  styleUrls: [ './progess-spinner.component.scss' ]
})
export class ProgessSpinnerComponent implements OnInit, OnDestroy {

  @Input() color?: ThemePalette = 'primary'
  @Input() diameter?: number = 100
  @Input() mode?: ProgressSpinnerMode = 'indeterminate'
  @Input() strokeWidth?: number
  @Input() value?: number = 50
  @Input() backdropEnabled = true
  @Input() positionGloballyCenter = true
  @Input() displayProgressSpinner: boolean

  @ViewChild('progressSpinnerRef')
  private _progressSpinnerRef: TemplateRef<any>
  private _progressSpinnerOverlayConfig: OverlayConfig
  private _overlayRef: OverlayRef
  constructor (private _vcRef: ViewContainerRef, private _overlayService: OverlayService) { }

  ngOnInit (): void {
    // Config for Overlay Service
    this._progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    }
    if (this.positionGloballyCenter) {
      this._progressSpinnerOverlayConfig['positionStrategy'] = this._overlayService.positionGloballyCenter()
    }
    // Create Overlay for progress spinner
    this._overlayRef = this._overlayService.createOverlay(this._progressSpinnerOverlayConfig)
  }
  ngDoCheck (): void {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this._overlayRef.hasAttached()) {
      this._overlayService.attachTemplatePortal(this._overlayRef, this._progressSpinnerRef, this._vcRef)
    } else if (!this.displayProgressSpinner && this._overlayRef.hasAttached()) {
      this._overlayRef.detach()
    }
  }

  ngOnDestroy (): void {
    if (this._overlayRef.hasAttached()) {
      this._overlayRef.detach()
    }
  }
}
