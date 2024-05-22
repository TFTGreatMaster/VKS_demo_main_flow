import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

import {IVuAn} from "../../interface/vu-an/vu-an";
import {VuAnService} from '../../service'
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";

@Component({
  selector: 'app-danh-sach',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    RippleModule,
    TableModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './danh-sach.component.html',
  styleUrl: './danh-sach.component.scss'
})
export class DanhSachComponent implements OnInit {

  vuAn!: IVuAn[];

  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDeleteModal: boolean = false;

  createVuAn: Omit<IVuAn, 'id'> = {name: ''}

  updateVuAn: IVuAn = {
    id: 0,
    name: ''
  }

  deleteVuAn: IVuAn = {
    id: 0,
    name: ''
  }

  onShowCreate() {
    this.visibleCreateModal = true
  }

  onShowUpdateVuan(vuAn: IVuAn) {
    this.updateVuAn.id = vuAn.id
    this.updateVuAn.name = vuAn.name
    this.visibleUpdateModal = true
  }

  onShowDeleteVuan(vuAn: IVuAn) {
    this.deleteVuAn.id = vuAn.id
    this.deleteVuAn.name = vuAn.name
    this.visibleDeleteModal = true
  }

  onDetailVuAn(vuAn: IVuAn) {
    this.taiLieuService.setIdVuAn(vuAn.id)
    void this.router.navigate(['/detail-vu-an'])
  }

  constructor(private vuAnService: VuAnService, private router: Router, private taiLieuService: TaiLieuService) {
  }

  ngOnInit() {
    // this.vuAnService.apiVuAn()
    this.vuAn = [
      {
        id: 1,
        name: 'vụ án 1'
      }, {
        id: 2,
        name: 'vụ án 2'
      }, {
        id: 3,
        name: 'vụ án 3'
      }, {
        id: 4,
        name: 'vụ án 4'
      }, {
        id: 5,
        name: 'vụ án 5'
      }, {
        id: 6,
        name: 'vụ án 6'
      },
    ]
  }


  onConfirmCreateVuAn() {
    console.log('this.createVuAn', this.createVuAn)
    this.vuAnService.apiCreateVuAn(this.createVuAn)
    this.visibleCreateModal = false
  }

  onConfirmUpdateVuAn() {
    console.log('updateVuAn:', this.updateVuAn)
    this.vuAnService.apiUpdateVuAn(this.updateVuAn)
    this.visibleUpdateModal = false
  }

  onConfirmDeleteVuAn() {
    console.log('deleteVuAn', this.deleteVuAn)
    this.visibleDeleteModal = false
    this.vuAnService.apiDeleteVuAn(this.deleteVuAn.id)
  }
}
