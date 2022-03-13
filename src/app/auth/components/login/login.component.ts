import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {actionRegister} from 'src/app/auth/store/actions/register.action'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/auth/store/actions/ngrx-storeSelectors'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/BackendErrors.interface'
import {RequestLoginInterface} from 'src/app/auth/types/requestLogin.interface'
import {actionLogin} from 'src/app/auth/store/actions/login.action'

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private formBuilder: FormBuilder,
    private ngrxStore: Store,
    private store: Store<AppStateInterface>
  ) {}
  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()

    //
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    const request: RequestLoginInterface = {
      user: this.loginForm.value,
    }

    this.ngrxStore.dispatch(actionLogin({request}))
  }
}
