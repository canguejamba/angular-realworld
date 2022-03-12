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

@Injectable()
export class EffectRegister {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(actionRegister),
      // read request
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return actionRegisterSuccess({currentUser})
          }),
          catchError(() => {
            return of(actionRegisterFailure())
          })
        )
      })
    )
  )

  constructor(private action$: Actions, private authService: AuthService) {}
}
