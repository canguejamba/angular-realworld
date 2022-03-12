import {createReducer, on, Action} from '@ngrx/store'
import {AuthStateInterface} from 'src/app/auth/types/authState.interface'
import {
  actionRegister,
  actionRegisterFailure,
  actionRegisterSuccess,
} from 'src/app/auth/store/actions/register.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoadingIn: null,
  validationErrors: null,
}

const authReducer = createReducer(
  initialState,
  on(
    actionRegister,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    actionRegisterSuccess,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoadingIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    actionRegisterFailure,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
)

export function btnFormRegisterSubmitStateReducer(
  state: AuthStateInterface,
  action: Action
) {
  return authReducer(state, action)
}
