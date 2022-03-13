import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {RequestRegisterInterface} from 'src/app/auth/types/requestRegister.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {AuthResponseInterface} from 'src/app/auth/types/auth.response'
import {RequestLoginInterface} from 'src/app/auth/types/requestLogin.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  register(data: RequestRegisterInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
  login(data: RequestLoginInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
}
