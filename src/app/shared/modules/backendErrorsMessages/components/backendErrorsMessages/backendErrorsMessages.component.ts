import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from 'src/app/shared/types/BackendErrors.interface'

@Component({
  selector: 'mc-backend-errors-messages',
  templateUrl: './backendErrorsMessages.component.html',
  styleUrls: ['./backendErrorsMessages.component.scss'],
})
export class BackendErrorsMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface
  errorMessages: string[]
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name]
        return `${name} ${messages}`
      }
    )
  }
}
