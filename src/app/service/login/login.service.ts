import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ILogin, IResLogin} from "../../interface/login/login";
import {DOMAIN} from "../../util/constant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  apiLogin(data: ILogin): Observable<IResLogin> {
    return this.http.post<IResLogin>(`${DOMAIN}/user/login`, data)
  }

}
