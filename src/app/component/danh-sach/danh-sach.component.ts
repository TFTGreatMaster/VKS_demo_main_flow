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
import {DetailVuAnService} from "../../service/detail-vu-an/detail-vu-an.service";
import {DOMAIN, mockListVuAn} from "../../util/constant";
import {MainService} from "../../service/main/main.service";
import {isModeOffline} from "../../util/common";
import {MODE_PROJECT} from "../../interface/main/main";
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

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
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './danh-sach.component.html',
  styleUrl: './danh-sach.component.scss'
})
export class DanhSachComponent implements OnInit {

  mode: MODE_PROJECT = MODE_PROJECT.ONLINE

  vuAn!: IVuAn[];

  visibleCreateModal: boolean = false;
  visibleUpdateModal: boolean = false;
  visibleDeleteModal: boolean = false;

  createVuAn: Omit<IVuAn, 'id'> = {name: '', description: ''}

  updateVuAn: IVuAn = {
    id: 0,
    name: '',
    description: '',
  }

  deleteVuAn: Omit<IVuAn, 'description'> = {
    id: 0,
    name: '',
  }

  constructor(
    private vuAnService: VuAnService,
    private router: Router,
    private detailVuAnService: DetailVuAnService,
    private mainService: MainService
  ) {
  }


  ngOnInit() {
    this.mainService.mode$.subscribe((mode: MODE_PROJECT) => {
      this.mode = mode
    })
    isModeOffline(this.mode) ? this.handleGetVuAnOffline() : this.handleGetAllVuAn()
  }

  handleGetVuAnOffline() {
    const dataVuAnJson = localStorage.getItem('list-vu-an')
    const dataVuAn = JSON.parse(dataVuAnJson || "")
    console.log('dataVuAn', dataVuAn)
    this.vuAn = dataVuAn.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description
    }))
    console.log('this.vuAn ', this.vuAn)
  }

  onShowCreate() {
    this.visibleCreateModal = true
  }

  onShowUpdateVuan(vuAn: IVuAn) {
    this.updateVuAn.id = vuAn.id
    this.updateVuAn.name = vuAn.name
    this.updateVuAn.description = vuAn.description
    this.visibleUpdateModal = true
  }

  onShowDeleteVuan(vuAn: IVuAn) {
    this.deleteVuAn.id = vuAn.id
    this.deleteVuAn.name = vuAn.name
    this.visibleDeleteModal = true
  }

  onDetailVuAn(vuAn: IVuAn) {
    this.detailVuAnService.setIdVuAn(vuAn.id)
    void this.router.navigate(['/detail-vu-an'])
  }

  handleGetAllVuAn() {
    this.vuAnService.apiGetAllVuAn().subscribe((res: IVuAn[]) => {
      this.vuAn = res
    })
  }

  onConfirmCreateVuAn() {
    this.vuAnService.apiCreateVuAn(this.createVuAn).subscribe(() => {
      this.handleGetAllVuAn()
      this.visibleCreateModal = false
    })
  }

  onConfirmUpdateVuAn() {
    this.vuAnService.apiUpdateVuAn(this.updateVuAn).subscribe(() => {
      this.handleGetAllVuAn()
      this.visibleUpdateModal = false
    })

  }

  onConfirmDeleteVuAn() {
    this.vuAnService.apiDeleteVuAn(this.deleteVuAn.id).subscribe(() => {
      this.handleGetAllVuAn()
      this.visibleDeleteModal = false
    })
  }

  onDownLoadVuAn(vuAn: IVuAn) {

    this.vuAnService.apiDownloadVuAn(vuAn.id).subscribe(res => {
      console.log('res', res)
      localStorage.setItem('list-vu-an', JSON.stringify(mockListVuAn))
    })
    window.require('electron').ipcRenderer.send('download-file', {
      downloadUrl: `${DOMAIN}/document/download-zip/${vuAn.id}`,
      fileName: `Va1.zip`
    });
  }

  protected readonly MODE_PROJECT = MODE_PROJECT;
}
