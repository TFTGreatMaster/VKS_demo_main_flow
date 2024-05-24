import {Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {TaiLieuModule} from "../tai-lieu/tai-lieu.module";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";
import {DetailVuAnService} from "../../service/detail-vu-an/detail-vu-an.service";
import {IDetailVuAn} from "../../interface/detail-vu-an/detail-vu-an";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MainService} from "../../service/main/main.service";
import {MODE_PROJECT} from "../../interface/main/main";
import {isModeOffline} from "../../util/common";

@Component({
  selector: 'app-detail-vu-an',
  standalone: true,
  imports: [
    TabViewModule,
    TaiLieuModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail-vu-an.component.html',
  styleUrl: './detail-vu-an.component.scss'
})
export class DetailVuAnComponent implements OnInit {

  idVuAn!: number
  mode: MODE_PROJECT = MODE_PROJECT.ONLINE

  detaiVuAn: IDetailVuAn = {
    id: 0,
    name: "",
    description: "",
    rootId: 0
  }

  constructor(
    private taiLieuService: TaiLieuService,
    private detailVuAnService: DetailVuAnService,
    private mainService: MainService
  ) {
  }

  ngOnInit() {
    this.detailVuAnService.idVuAn$.subscribe((idVuAn: number) => {
      this.idVuAn = idVuAn
    })
    this.mainService.mode$.subscribe((mode: MODE_PROJECT) => {
      isModeOffline(mode) ? this.mode = MODE_PROJECT.OFFLINE : this.mode = MODE_PROJECT.ONLINE
    })
    if (isModeOffline(this.mode)) {
      const dataVuAnJson = localStorage.getItem('list-vu-an')
      const listVuAn = JSON.parse(dataVuAnJson || "")
      const vuAn = listVuAn.find((item: any) => item.id === this.idVuAn)
      this.detaiVuAn = {
        id: vuAn.id,
        name: vuAn.name,
        description: vuAn.description,
        rootId: vuAn.rootId
      }
      this.taiLieuService.setIdRoot(this.detaiVuAn.rootId)
    } else {
      this.detailVuAnService.apiGetDetailVuAn(this.idVuAn).subscribe((detailVuAn: IDetailVuAn) => {
        this.detaiVuAn = detailVuAn
        this.taiLieuService.setIdRoot(detailVuAn.rootId)
      })
    }
  }
}
