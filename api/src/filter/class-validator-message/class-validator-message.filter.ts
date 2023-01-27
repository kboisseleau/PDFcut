import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { Response } from 'express'

@Catch(HttpException)
export class ClassValidatorMessageFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    
    if (status === 422) {
      const error: { message: string, custom: string } = exception.getResponse() as { message: string, custom: string }

      if (error.message) {
        error.custom = error.message
        delete error.message
        response.status(status).json(exception)
      } else {
        const validationErrors = exception.getResponse() as ValidationError[]
        validationErrors.forEach(erreur => erreur = this._traduireErreur(erreur))
        response.status(status).json(exception)
      }
    } else {
      response.status(status).json(exception)
    }

  }

  private _traduireErreur (erreur: ValidationError): ValidationError {

    if (!erreur.constraints && erreur.children) {
      erreur.children.forEach((erreurChild: any) => erreurChild = this._traduireErreur(erreurChild))
    }
    if (erreur.constraints) {
      if (erreur.constraints.min) {
        const valeur = erreur.constraints.min.split('than')[1]
        erreur.constraints.min = 'Doit être supérieur à' + valeur + '.'
      }

      if (erreur.constraints.max) {
        const valeur = erreur.constraints.max.split('than')[1]
        erreur.constraints.max = 'Doit être inférieur à' + valeur + '.'
      }

      if (erreur.constraints.isEmail) {
        erreur.constraints.isEmail = 'Doit être un email.'
      }

      if (erreur.constraints.isNumber) {
        erreur.constraints.isNumber = 'Doit être un nombre.'
      }

      if (erreur.constraints.isJson) {
        erreur.constraints.isJson = 'Doit être un Json.'
      }

      if (erreur.constraints.isString) {
        erreur.constraints.isString = 'Doit être une chaine de caractères.'
      }

      if (erreur.constraints.isBoolean) {
        erreur.constraints.isBoolean = 'Doit être un booléen.'
      }

      if (erreur.constraints.isInt) {
        erreur.constraints.isInt = 'Doit être un entier.'
      }

      if (erreur.constraints.isArray) {
        erreur.constraints.isArray = 'Doit être un tableau.'
      }

      if (erreur.constraints.isEmpty) {
        erreur.constraints.isEmpty = 'Doit être vide.'
      }

      if (erreur.constraints.isDateString) {
        erreur.constraints.isDateString = 'Doit être une date.'
      }

      if (erreur.constraints.minLength) {
        const valeur = erreur.constraints.minLength.split('equal to')[1].split('character')[0]
        erreur.constraints.minLength = 'Doit faire au minimum' + valeur + 'caractères.'
      }

      if (erreur.constraints.length) {
        const valeur = erreur.constraints.length.split('equal to')[1].split('character')[0]
        erreur.constraints.length = 'Doit faire au maximum' + valeur + 'caractères.'
      }

      if (erreur.constraints.isNotEmpty) {
        erreur.constraints.isNotEmpty = 'Ne doit pas être vide.'
      }

      if (erreur.constraints.maxLength) {
        const valeur = erreur.constraints.maxLength.split('equal to')[1].split('character')[0]
        erreur.constraints.maxLength = 'Doit faire au maximum' + valeur + 'caractères.'
      }

      if (erreur.constraints.ArrayNotEmpty) {
        erreur.constraints.ArrayNotEmpty = 'Ne doit pas être vide.'
      }
    }

    return erreur
  }
}
