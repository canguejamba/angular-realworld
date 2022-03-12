import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule, Routes} from '@angular/router'
import {StoreModule} from '@ngrx/store'

import {RegisterComponent} from 'src/app/auth/components/register/register.component'
import {btnFormRegisterSubmitStateReducer} from 'src/app/auth/store/reducers'
import {AuthService} from 'src/app/auth/service/auth.service'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', btnFormRegisterSubmitStateReducer),
  ],
  declarations: [RegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}
