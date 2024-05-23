import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MODE_PROJECT} from "../../interface/main/main";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() {
    this.setData(MODE_PROJECT.ONLINE)
  }

  private dataSource = new BehaviorSubject<any>(null);
  data$ = this.dataSource.asObservable();

  setData(data: MODE_PROJECT) {
    this.dataSource.next(data);
  }
}
