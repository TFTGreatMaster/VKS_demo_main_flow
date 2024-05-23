import {Component, OnInit} from '@angular/core';
import {TabViewModule} from "primeng/tabview";
import {TaiLieuModule} from "../tai-lieu/tai-lieu.module";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";
import {DetailVuAnService} from "../../service/detail-vu-an/detail-vu-an.service";
import {IDetailVuAn} from "../../interface/detail-vu-an/detail-vu-an";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

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

  detaiVuAn: IDetailVuAn = {
    id: 0,
    name: "",
    description: "",
    rootId: 0
  }

  constructor(private taiLieuService: TaiLieuService, private detailVuAnService: DetailVuAnService) {
  }

  ngOnInit() {
    this.detailVuAnService.idVuAn$.subscribe((idVuAn: number) => {
      this.detailVuAnService.apiGetDetailVuAn(idVuAn).subscribe((detailVuAn: IDetailVuAn) => {
        this.detaiVuAn = detailVuAn
        this.taiLieuService.setIdRoot(detailVuAn.rootId)
      })
    })
  }
}
