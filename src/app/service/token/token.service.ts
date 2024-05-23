import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IToken} from "../../interface/token/token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {
  }

  Domain = "http://localhost:3000"

  apiToken(): Observable<IToken> {
    return this.http.get<IToken>(this.Domain)
  }
}
