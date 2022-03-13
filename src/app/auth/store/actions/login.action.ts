import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/auth/store/actions/actionTypes'
import {BackendErrorsInterface} from 'src/app/shared/types/BackendErrors.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {RequestLoginInterface} from 'src/app/auth/types/requestLogin.interface'

export const actionLogin = createAction(
  ActionTypes.LOGIN,
  props<{request: RequestLoginInterface}>()
)

export const actionLoginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const actionLoginFailure = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
