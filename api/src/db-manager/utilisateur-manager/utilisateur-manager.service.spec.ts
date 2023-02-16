import { Test, TestingModule } from '@nestjs/testing'
import { UtilisateurManagerService } from './utilisateur-manager.service'

describe('UtilisateurManagerService', () => {
  let service: UtilisateurManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UtilisateurManagerService ]
    }).compile()

    service = module.get<UtilisateurManagerService>(UtilisateurManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
