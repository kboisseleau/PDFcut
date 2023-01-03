import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ModalZoomImgComponent } from './modal-zoom-img.component'

describe('ModalZoomImgComponent', () => {
  let component: ModalZoomImgComponent
  let fixture: ComponentFixture<ModalZoomImgComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalZoomImgComponent ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(ModalZoomImgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
