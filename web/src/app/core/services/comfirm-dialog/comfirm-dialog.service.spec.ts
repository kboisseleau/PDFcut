import { TestBed } from '@angular/core/testing'

import { ComfirmDialogService } from './comfirm-dialog.service'

describe('ComfirmDialogService', () => {
  let service: ComfirmDialogService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ComfirmDialogService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
