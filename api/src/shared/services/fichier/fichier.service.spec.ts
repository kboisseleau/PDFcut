import { Test, TestingModule } from '@nestjs/testing'
import { FichierService } from './fichier.service'
import { FichierManagerService } from '../../../db-manager/fichier-manager/fichier-manager.service'
import { NestLoggerService } from '@sirap-next/nest-logger'

describe('FichierService', () => {
  let service: FichierService

  const mockRepo = {
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    insert: jest.fn()
  }

  const mockSirapNestLoggerService = {
    errorObject: jest.fn(),
    warn: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FichierService,
        {
          provide: FichierManagerService,
          useValue: mockRepo
        },
        {
          provide: NestLoggerService,
          useValue: mockSirapNestLoggerService
        }
      ]
    }).compile()

    service = module.get<FichierService>(FichierService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
