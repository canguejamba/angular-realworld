import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  actionRegister,
  actionRegisterFailure,
  actionRegisterSuccess,
} from 'src/app/auth/store/actions/register.action'
import {AuthService} from 'src/app/auth/service/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {LocalStoregePersistenceService} from 'src/app/shared/services/localstoragePersistence.service'
import {Router} from '@angular/router'

@Injectable()
export class EffectRegister {
  register$ = createEffect(() =>
    this.actions$.pipe(
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

  redirectAfterSubmit = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionRegisterSuccess),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStoregePersistenceService: LocalStoregePersistenceService,
    private router: Router
  ) {}
}
