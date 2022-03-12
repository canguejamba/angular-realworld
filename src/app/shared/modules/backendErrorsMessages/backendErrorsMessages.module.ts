import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BackendErrorsMessagesComponent} from 'src/app/shared/modules/backendErrorsMessages/components/backendErrorsMessages/backendErrorsMessages.component'

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorsMessagesComponent],
  exports: [BackendErrorsMessagesComponent],
})
export class BackendErrorsMessagesModule {}
