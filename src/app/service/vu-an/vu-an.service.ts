import {Injectable} from '@angular/core';
import {IVuAn} from "../../interface/vu-an/vu-an";

@Injectable({
  providedIn: 'root'
})
export class VuAnService {

  constructor() {
  }

  apiVuAn() {

  }

  apiCreateVuAn(vuAn: Omit<IVuAn, 'id'>) {
    console.log('dataCreateVuAn', vuAn)
  }

  apiUpdateVuAn(vuAn: IVuAn) {
    console.log('dataUpdateVuAn', vuAn)
  }

  apiDeleteVuAn(id: number) {
    console.log('idDelete', id)
  }
}
