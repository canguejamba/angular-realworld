import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AuthStateInterface} from 'src/app/auth/types/authState.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'

/* export const authBtnFormRegisterFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth') */

export const featureKey = 'auth'

export const selectFeature = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>(featureKey)

export const isSubmittingSelector = createSelector(
  selectFeature,
  (state: AuthStateInterface) => state.isSubmitting
)
