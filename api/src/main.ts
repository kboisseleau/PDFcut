import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import appDataSource from '../ormconfig'
import helmet from 'helmet'
import { json, urlencoded } from 'body-parser'

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  
  app.setGlobalPrefix('api')
  app.use(json({ limit: '10mb' }))
  app.use(urlencoded({ limit: '10mb', extended: true }))
  app.enableCors()
  app.use(helmet({ contentSecurityPolicy: false }))
  await app.listen(3000)
  await appDataSource.initialize()

}
bootstrap()
