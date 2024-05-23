import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DOMAIN} from "../../util/constant";
import {IDetailVuAn} from "../../interface/detail-vu-an/detail-vu-an";

@Injectable({
  providedIn: 'root'
})
export class DetailVuAnService {

  constructor(private http: HttpClient) {
  }

  private idVuAn = new BehaviorSubject<any>(null);
  idVuAn$ = this.idVuAn.asObservable();

  setIdVuAn(idVuAn: number) {
    this.idVuAn.next(idVuAn);
  }

  apiGetDetailVuAn(idVuAn: number): Observable<IDetailVuAn> {
    return this.http.get<IDetailVuAn>(`${DOMAIN}/vu-an/get/${idVuAn}`)
  }
}
