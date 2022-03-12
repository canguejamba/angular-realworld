import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {AuthResponseInterface} from 'src/app/auth/types/auth.response'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RequestRegisterInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
