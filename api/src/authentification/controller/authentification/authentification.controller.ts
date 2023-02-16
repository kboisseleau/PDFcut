import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Utilisateur } from 'db/entities/Utilisateur'
import { LoginDto } from 'src/authentification/dto/login.dto'
import { JwtAuthGuard } from 'src/authentification/guard/jwt-auth.guard'
import { LocalAuthGuard } from 'src/authentification/guard/local-auth.guard'
import { AuthentificationService } from 'src/authentification/services/authentification/authentification.service'

@Controller('authentification')
export class AuthentificationController {
  constructor (private _authService: AuthentificationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Request() req: any): Promise<{accessToken: string}> {
    return this._authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile (@Request() req) {
    return req.user
  }
}
