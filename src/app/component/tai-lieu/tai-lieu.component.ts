import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MenuItem} from 'primeng/api';
import {FileUploadEvent} from "primeng/fileupload";

import {IBreadCrumbItem} from "../../core/interface/index.interface";
import {IDataProps, ISelectItem} from '../defaul-card/defaul-card.component';
import {DOMAIN} from "../../util/constant";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";


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
  constructor(private http: HttpClient, private taiLieuSerVice: TaiLieuService) {
  }


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


  ngOnInit(): void {
    this.taiLieuSerVice.rootId$.subscribe((idRoot) => {
      this.breadCrumb.items.push({label: 'Tài liệu', id: `${idRoot}`, index: 1})
      this.handleGetDocuments({id: idRoot, name: ''})
    })

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
    this.handleGetDocuments({id: Number(item.id), name: item.label})
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
}
