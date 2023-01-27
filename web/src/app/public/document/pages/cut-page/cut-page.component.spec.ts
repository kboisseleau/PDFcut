import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CutPageComponent } from './cut-page.component'

describe('CutPageComponent', () => {
  let component: CutPageComponent
  let fixture: ComponentFixture<CutPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutPageComponent ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(CutPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
