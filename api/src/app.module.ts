import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MetierModule } from './metier/metier.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    MetierModule,
    SharedModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {}
