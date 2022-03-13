import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule, Routes} from '@angular/router'
import {StoreModule} from '@ngrx/store'

import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {reducer} from 'src/app/auth/store/actions/reducers'
import {AuthService} from 'src/app/auth/service/auth.service'
import {EffectsModule} from '@ngrx/effects'
import {EffectRegister} from 'src/app/auth/store/effects/register.effect'
import {BackendErrorsMessagesModule} from 'src/app/shared/modules/backendErrorsMessages/backendErrorsMessages.module'
import {LocalStoregePersistenceService} from 'src/app/shared/services/localstoragePersistence.service'
import {EffectLogin} from 'src/app/auth/store/effects/login.effect'
import {LoginComponent} from 'src/app/auth/components/login/login.component'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([EffectRegister, EffectLogin]),
    BackendErrorsMessagesModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, LocalStoregePersistenceService],
})
export class AuthModule {}
