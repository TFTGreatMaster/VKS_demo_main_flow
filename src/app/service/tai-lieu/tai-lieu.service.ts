import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaiLieuService {

  constructor() {
  }

  private idVuAn = new BehaviorSubject<any>(null);
  idVuAn$ = this.idVuAn.asObservable();

  setIdVuAn(idVuAn: any) {
    this.idVuAn.next(idVuAn);
  }

}
