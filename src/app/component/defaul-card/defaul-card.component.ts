import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface IDataProps {
  id: number;
  name: string;
  url?: string;
  type: 'file' | 'folder';
}

export interface ISelectItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
}

@Component({
  selector: 'app-defaul-card',
  templateUrl: './defaul-card.component.html',
  styleUrl: './defaul-card.component.scss',
})
export class DefaulCardComponent {
  @Input() props!: IDataProps;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickItem: EventEmitter<any> = new EventEmitter<any>()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDeleteItem: EventEmitter<number> = new EventEmitter<number>()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onUpdateItem: EventEmitter<ISelectItem> = new EventEmitter<ISelectItem>()

  isUpdateModal: boolean = false;
  isDeleteModal: boolean = false;
  isMoveModal: boolean = false;
  selectItem: ISelectItem = {
    id: 0,
    name: '',
    type: 'folder',
  };

  showName() {
    if (this.props.type === 'file') {
      return this.props.name;
    }
  }

  onShowDeleteModal(data: ISelectItem) {
    this.isDeleteModal = true;
    this.selectItem.id = data.id;
    this.selectItem.name = data.name;
    this.selectItem.type = data.type;
  }

  onDeleteConfirm() {
    this.isUpdateModal = false;
    this.onDeleteItem.emit(this.selectItem.id)
  }

  onShowUpdateModal(data: ISelectItem) {
    this.isUpdateModal = true;
    this.selectItem.id = data.id;
    this.selectItem.name = data.name;
    this.selectItem.type = data.type;
  }

  onUpdateConfirm() {
    this.isUpdateModal = false;
    this.onUpdateItem.emit(this.selectItem)
  }

  onCancelModal() {
    this.isUpdateModal = false;
    this.isDeleteModal = false;
    this.isMoveModal = false;
  }

  onShowMoveModal(data: ISelectItem) {
    this.isMoveModal = true;
    this.selectItem.id = data.id;
    this.selectItem.name = data.name;
    this.selectItem.type = data.type;
  }

  onClickCard({documentId, documentName}: any) {
    this.onClickItem.emit({id: documentId, name: documentName})
  }
}
