import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[dragAndDrop]'
})
export class DragAndDropDirective {

  private _bDragEnabled = false
  private _background = '#f5fcff'
  private _opacity = '1'

  @Input()
  get bDragEnabled (): boolean {
    return this._bDragEnabled
  }
  set bDragEnabled (enabled: boolean) {
    this._bDragEnabled = enabled
  }
  @Output() fileDropped = new EventEmitter<any>()

  @HostBinding('style.background-color')
  get background (): string {
    return this._bDragEnabled ? this._background : '#cccccc'
  }
  set background (bg: string) {
    this._background = bg
  }
  @HostBinding('style.opacity')
  get opacity (): string {
    return this._bDragEnabled ? this._opacity : '.5'
  }
  set opacity (opa: string) {
    this._opacity = opa
  }

  // Dragover listener
  @HostListener('dragover', [ '$event' ]) onDragOver (evt: any): void {
    if (this.bDragEnabled) {
      evt.preventDefault()
      evt.stopPropagation()
      this.background = '#9ecbec'
      this.opacity = '0.8'
    }
  }

  // Dragleave listener
  @HostListener('dragleave', [ '$event' ]) public onDragLeave (evt: any): void {
    if (this.bDragEnabled) {
      evt.preventDefault()
      evt.stopPropagation()
      this.background = '#f5fcff'
      this.opacity = '1'
    }
  }

  // Drop listener
  @HostListener('drop', [ '$event' ]) public ondrop (evt: any): void {
    if (this.bDragEnabled) {
      evt.preventDefault()
      evt.stopPropagation()
      this.background = '#f5fcff'
      this.opacity = '1'
      const files = evt.dataTransfer.files
      if (files.length > 0) {
        this.fileDropped.emit(files)
      }
    }
  }

}
