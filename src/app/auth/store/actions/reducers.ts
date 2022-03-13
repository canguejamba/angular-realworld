import {createReducer, on, Action} from '@ngrx/store'
import {AuthStateInterface} from 'src/app/auth/types/authState.interface'
import {
  actionRegister,
  actionRegisterFailure,
  actionRegisterSuccess,
} from 'src/app/auth/store/actions/register.action'
import {
  actionLogin,
  actionLoginFailure,
  actionLoginSuccess,
} from 'src/app/auth/store/actions/login.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoadingIn: null,
  validationErrors: null,
}

const authReducer = createReducer(
  initialState,
  // state of register
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
  ),
  // state of login
  on(
    actionLogin,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    actionLoginSuccess,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoadingIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    actionLoginFailure,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
)

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
