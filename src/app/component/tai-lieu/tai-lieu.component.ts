import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MenuItem} from 'primeng/api';
import {FileUploadEvent} from "primeng/fileupload";

import {IBreadCrumbItem} from "../../core/interface/index.interface";
import {IDataProps, ISelectItem} from '../defaul-card/defaul-card.component';
import {DOMAIN} from "../../util/constant";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";
import {MODE_PROJECT} from "../../interface/main/main";
import {MainService} from "../../service/main/main.service";
import {isModeOffline} from "../../util/common";
import {DetailVuAnService} from "../../service/detail-vu-an/detail-vu-an.service";


export interface IRootDocument {
  id: number;
  name: string;
  type: 'file' | 'folder';
  childDocuments: IDataProps[] | [];
  parentId?: number;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}


@Component({
  selector: 'app-tai-lieu',
  templateUrl: './tai-lieu.component.html',
  styleUrls: ['./tai-lieu.component.scss'],
})
export class TaiLieuComponent implements OnInit {

  mode: MODE_PROJECT = MODE_PROJECT.ONLINE

  idVuAn!: number

  breadCrumb: {
    items: MenuItem[],
    home: MenuItem | undefined
  } = {
    items: [],
    home: undefined
  }


  folderData: IDataProps[] = [
    {
      id: 0,
      name: '',
      type: 'folder',
    },
  ];
  fileData: IDataProps[] = [
    {
      id: 0,
      name: '',
      type: 'file',
      url: '',
    },
  ];
  isCreateModal: boolean = false;
  folderCreate = {
    name: '',
    type: 'folder',
  };

  constructor(
    private http: HttpClient,
    private taiLieuSerVice: TaiLieuService,
    private mainService: MainService,
    private detailVuAnService: DetailVuAnService
  ) {
  }

  ngOnInit(): void {
    this.detailVuAnService.idVuAn$.subscribe((idVuAn: number) => {
      this.idVuAn = idVuAn
    })
    this.taiLieuSerVice.rootId$.subscribe((idRoot: number) => {
      this.breadCrumb.items.push({label: 'Tài liệu', id: `${idRoot}`, index: 1})
      this.mainService.mode$.subscribe((mode: MODE_PROJECT) => {
        this.mode = mode
        isModeOffline(mode) ?
          this.handleGetDocumentsOffline({id: idRoot, name: ''})
          :
          this.handleGetDocuments({id: idRoot, name: ''})
      })
    })
  }

  handleGetDocumentsOffline(data: { id: number, name: string }) {
    const dataVuAnJson = localStorage.getItem('list-vu-an')
    const listVuAn = JSON.parse(dataVuAnJson || "")
    const arrFile: IDataProps[] = [];
    const arrFolder: IDataProps[] = [];
    if (listVuAn.length) {
      const vuAn = listVuAn.find((item: any) => item.id === this.idVuAn)
      const document = vuAn.documents
      document.forEach((item: any) => {
        if (item.parentDocumentId === data.id) {
          item.type === 'folder' ? arrFolder.push(item) : arrFile.push(item)
        }
      })
      this.folderData = [...arrFolder];
      this.fileData = [...arrFile];
    } else {
      this.folderData = [...arrFolder];
      this.fileData = [...arrFile];
    }
    if (data.name !== '' && !this.breadCrumb.items.find((value) => Number(value.id) === data.id)) {
      this.breadCrumb.items = [...this.breadCrumb.items, {
        label: data.name,
        id: `${data.id}`,
        index: this.breadCrumb.items.length + 1
      }]
    }
  }

  handleGetDocuments(data: { id: number, name: string }) {
    this.http
      .get<IRootDocument>(`${DOMAIN}/document/${data.id}`)
      .subscribe((res: IRootDocument) => {
        const arrFile: IDataProps[] = [];
        const arrFolder: IDataProps[] = [];
        if (res.childDocuments.length > 0) {
          res.childDocuments.forEach((item) => {
            if (item.type === 'file') {
              arrFile.push(item);
            } else {
              arrFolder.push(item);
            }
          });
          this.folderData = [...arrFolder];
          this.fileData = [...arrFile];
        } else {
          this.folderData = [];
          this.fileData = [];
        }
        if (res && data.name !== '' && !this.breadCrumb.items.find((value) => Number(value.id) === data.id)) {
          this.breadCrumb.items = [...this.breadCrumb.items, {
            label: data.name,
            id: `${data.id}`,
            index: this.breadCrumb.items.length + 1
          }]
        }
      });
  }

  handleReload() {
    const idParent = this.breadCrumb.items[this.breadCrumb.items.length - 1].id
    const nameParent: string = this.breadCrumb.items[this.breadCrumb.items.length - 1].label!
    this.handleGetDocuments({id: Number(idParent), name: nameParent})
  }

  handleClickBreadCrumd(item: IBreadCrumbItem) {
    this.breadCrumb.items = this.breadCrumb.items.slice(0, item.index)
    isModeOffline(this.mode) ?
      this.handleGetDocumentsOffline({id: Number(item.id), name: item.label})
      : this.handleGetDocuments({id: Number(item.id), name: item.label})
  }

  onShowCreateModal(): void {
    this.isCreateModal = true;
  }

  onCreateConfirm(): void {
    this.isCreateModal = false;
    const idParent = this.breadCrumb.items[this.breadCrumb.items.length - 1].id
    this.http.post(`${DOMAIN}/document/create-folder/${idParent}`, {
      name: this.folderCreate.name,
      type: this.folderCreate.type,
    }).subscribe(() => {
      this.handleReload()
    })
  }

  onUpdateItem(data: ISelectItem) {
    this.http.put(`${DOMAIN}/document/update/${data.id}`, {
      name: data.name,
    }).subscribe(() => {
      this.handleReload()
    })
  }

  onCancelModal(): void {
    this.isCreateModal = false;
  }

  onUpload(event: FileUploadEvent): void {
    const idParent = this.breadCrumb.items[this.breadCrumb.items.length - 1].id
    const formData = new FormData();
    formData.append(`file`, event.files[0]);
    this.http.post(`${DOMAIN}/document/create-file/${idParent}`, formData).subscribe(() => {
      this.handleReload()
    })
  }

  onDeleteItem(id: number) {
    this.http.delete(`${DOMAIN}/document/${id}`).subscribe(() => {
      this.handleReload()
    })
  }

  handleClickFolder(data: { id: number, name: string }) {
    isModeOffline(this.mode)
      ? this.handleGetDocumentsOffline(data)
      : this.handleGetDocuments(data)
  }

  protected readonly MODE_PROJECT = MODE_PROJECT;
}
