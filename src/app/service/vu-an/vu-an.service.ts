import {Injectable} from '@angular/core';
import {IVuAn, IVuAnOff} from "../../interface/vu-an/vu-an";
import {HttpClient} from "@angular/common/http";
import {DOMAIN} from "../../util/constant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VuAnService {

  constructor(private http: HttpClient) {
  }

  apiGetAllVuAn(): Observable<IVuAn[]> {
    return this.http.get<IVuAn[]>(`${DOMAIN}/vu-an/get`)
  }

  apiCreateVuAn(vuAn: Omit<IVuAn, 'id' | 'rootId'>): Observable<Omit<IVuAn, 'id'>> {
    return this.http.post<Omit<IVuAn, 'id'>>(`${DOMAIN}/vu-an`, vuAn)
  }

  apiUpdateVuAn(vuAn: IVuAn): Observable<IVuAn> {
    return this.http.put<IVuAn>(`${DOMAIN}/vu-an/update/${vuAn.id}`, vuAn)
  }

  apiDeleteVuAn(id: number): Observable<IVuAn> {
    return this.http.delete<IVuAn>(`${DOMAIN}/vu-an/delete/${id}`)
  }

  apiDownloadVuAn(id: number): Observable<IVuAnOff> {
    return this.http.get<IVuAnOff>(`${DOMAIN}/vu-an/download/${id}`)
  }

}
