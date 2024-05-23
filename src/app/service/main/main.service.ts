import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MODE_PROJECT} from "../../interface/main/main";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() {
    this.setMode(MODE_PROJECT.ONLINE)
  }

  private mode = new BehaviorSubject<any>(null);
  mode$ = this.mode.asObservable();

  setMode(data: MODE_PROJECT) {
    this.mode.next(data);
  }
}
