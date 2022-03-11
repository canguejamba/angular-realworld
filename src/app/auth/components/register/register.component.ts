import { Component } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
   profileForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],

  });

  constructor(private formBuilder: FormBuilder) { }

 


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('submit',this.profileForm.value, this.profileForm.valid);
  }
}