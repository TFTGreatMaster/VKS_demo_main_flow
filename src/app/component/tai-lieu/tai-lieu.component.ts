import {Component, OnInit} from '@angular/core';
// import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


import {MenuItem} from 'primeng/api';

import {IBreadCrumbItem} from "../../core/interface/index.interface";
import {IDataProps, ISelectItem} from '../defaul-card/defaul-card.component';


interface IRootDocument {
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
  constructor(private http: HttpClient) {
  }

  private DOMAIN = 'http://192.168.1.50:8082'

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
    this.breadCrumb.items.push({label: 'Tài liệu', id: '6', index: 1})
    this.handleGetDocuments({id: 6, name: ''})
  }

  handleGetDocuments(data: { id: number, name: string }) {
    console.log('handleGetDocument: ==============> ', data)
    this.http
      .get<IRootDocument>(`${this.DOMAIN}/document/${data.id}`)
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
    console.log('this.folderCreate.name', this.folderCreate.name)
    this.isCreateModal = false;
    const idParent = this.breadCrumb.items[this.breadCrumb.items.length - 1].id
    this.http.post(`${this.DOMAIN}/vu-an/1/documents`, {
      name: this.folderCreate.name,
      type: this.folderCreate.type,
      parent_document_id: idParent
    }).subscribe(() => {
      this.handleReload()
    })
  }

  onUpdateItem(data: ISelectItem) {
    this.http.put(`${this.DOMAIN}/document/update/${data.id}`, {
      name: data.name,
    }).subscribe(() => {
      this.handleReload()
    })
  }

  onCancelModal(): void {
    this.isCreateModal = false;
  }

  onUpload(event: any): void {
    console.log('event', event)
    const idParent = this.breadCrumb.items[this.breadCrumb.items.length - 1].id
    const formData = new FormData();
    formData.append(`file`, event.files[0]);
    this.http.post(`${this.DOMAIN}/document/create-file/${idParent}`, formData).subscribe(() => {
      this.handleReload()
    })
  }

  onDeleteItem(id: number) {
    console.log('idid', id)
    this.http.delete(`${this.DOMAIN}/document/${id}`).subscribe(() => {
      this.handleReload()
    })
  }
}
