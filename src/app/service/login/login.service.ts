import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ILogin} from "../../interface/login/login";
import {DOMAIN} from "../../util/constant";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  apiLogin(data: ILogin) {
    return this.http.post(`${DOMAIN}/login`, {
      data
    })
  }

}
