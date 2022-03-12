import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {actionRegister} from 'src/app/auth/store/actions/register.action'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {isSubmittingSelector} from 'src/app/auth/store/actions/ngrx-storeSelectors'
import {AuthService} from 'src/app/auth/service/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isSubmitting$: Observable<boolean>
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private ngrxStore: Store,
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.initializeValues()
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    console.log('isSubmitting ', this.isSubmitting$)
    //
  }

  initializeValues(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('submit', this.registerForm.value, this.registerForm.valid)
    this.ngrxStore.dispatch(actionRegister(this.registerForm.value))
    this.authService
      .register(this.registerForm.value)
      .subscribe((currentUser: CurrentUserInterface) => {
        console.log('currentUser', currentUser)
      })
  }
}
