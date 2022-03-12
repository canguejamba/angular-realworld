import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/auth/store/actions/actionTypes'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const actionRegister = createAction(
  ActionTypes.REGISTER,
  props<{request: RequestRegisterInterface}>()
)
export const actionRegisterSuccess = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)
export const actionRegisterFailure = createAction(ActionTypes.REGISTER_FAILURE)
