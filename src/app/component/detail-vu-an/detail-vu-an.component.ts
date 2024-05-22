import {Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {TaiLieuModule} from "../tai-lieu/tai-lieu.module";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";

@Component({
  selector: 'app-detail-vu-an',
  standalone: true,
  imports: [
    TabViewModule,
    TaiLieuModule
  ],
  templateUrl: './detail-vu-an.component.html',
  styleUrl: './detail-vu-an.component.scss'
})
export class DetailVuAnComponent implements OnInit {

  constructor(private taiLieuService: TaiLieuService) {
  }

  ngOnInit() {
    this.taiLieuService.idVuAn$.subscribe((id) => {
      console.log('idVuAn', id)
    })
  }
}
