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
import {AuthService} from 'src/app/auth/service/auth.service'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'
import {BackendErrorsInterface} from 'src/app/shared/types/BackendErrors.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
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
    console.log('initializeForm')
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('submit', this.registerForm.value, this.registerForm.valid)
    const request: RequestRegisterInterface = {
      user: this.registerForm.value,
    }

    this.ngrxStore.dispatch(actionRegister({request}))
  }
}
