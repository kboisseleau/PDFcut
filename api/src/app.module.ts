import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbManagerModule } from './db-manager/db-manager.module'
import { ClassValidatorMessageFilter } from './filter/class-validator-message/class-validator-message.filter'
import { MetierModule } from './metier/metier.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MetierModule,
    SharedModule,
    DbManagerModule
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ClassValidatorMessageFilter
    }
  ]
})
export class AppModule {}
