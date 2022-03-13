import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  actionRegister,
  actionRegisterFailure,
  actionRegisterSuccess,
} from 'src/app/auth/store/actions/register.action'
import {AuthService} from 'src/app/auth/service/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {LocalStoregePersistenceService} from 'src/app/shared/services/localstoragePersistence.service'

@Injectable()
export class EffectRegister {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(actionRegister),
      // read request
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.localStoregePersistenceService.set(
              'accessToken',
              currentUser.token
            )
            return actionRegisterSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              actionRegisterFailure({errors: errorResponse.error.errors})
            )
          })
        )
      })
    )
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private localStoregePersistenceService: LocalStoregePersistenceService
  ) {}
}
