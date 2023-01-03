import { Test, TestingModule } from '@nestjs/testing'
import { FichierManagerService } from './fichier-manager.service'

describe('FichierManagerService', () => {
  let service: FichierManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ FichierManagerService ]
    }).compile()

    service = module.get<FichierManagerService>(FichierManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
