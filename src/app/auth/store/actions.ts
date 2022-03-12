import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/auth/store/actionTypes'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'

export const actionRegister = createAction(
  ActionTypes.REGISTER,
  props<{request: RequestRegisterInterface}>()
)
