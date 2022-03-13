import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from 'src/app/auth/service/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {LocalStoregePersistenceService} from 'src/app/shared/services/localstoragePersistence.service'
import {Router} from '@angular/router'
import {
  actionLogin,
  actionLoginFailure,
  actionLoginSuccess,
} from 'src/app/auth/store/actions/login.action'

@Injectable()
export class EffectLogin {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLogin),
      // read request
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.localStoregePersistenceService.set(
              'accessToken',
              currentUser.token
            )
            return actionLoginSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(actionLoginFailure({errors: errorResponse.error.errors}))
          })
        )
      })
    )
  )

  redirectAfterSubmit = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionLoginSuccess),
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
