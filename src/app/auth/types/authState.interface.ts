import {BackendErrorsInterface} from 'src/app/shared/types/BackendErrors.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null
  isLoadingIn: boolean | null
  validationErrors: BackendErrorsInterface | null
}
