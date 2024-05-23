import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaiLieuService {

  constructor() {
  }

  private rootId = new BehaviorSubject<any>(null);
  rootId$ = this.rootId.asObservable();

  setIdRoot(rootId: number) {
    this.rootId.next(rootId);
  }

}
