import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {NgForOf, NgIf} from "@angular/common";
import {IDataProps} from "../defaul-card/defaul-card.component";
import {DOMAIN} from "../../util/constant";
import {HttpClient} from "@angular/common/http";
import {TaiLieuService} from "../../service/tai-lieu/tai-lieu.service";
import {IRootDocument} from "../tai-lieu/tai-lieu.component";

@Component({
  selector: 'app-move',
  standalone: true,
  imports: [DialogModule, ButtonModule, TableModule, NgForOf, NgIf],
  templateUrl: './move.component.html',
  styleUrl: './move.component.scss'
})
export class MoveComponent implements OnChanges {
  @Input() isMoveModal: boolean = false;
  constructor(private http: HttpClient, private taiLieuSerVice: TaiLieuService) {
  }

  folderData: IDataProps[] = [
    {
      id: 0,
      name: '',
      type: 'folder',
    },
  ];

  rootFolder!:IRootDocument

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    // Thực hiện các tác vụ khi prop thay đổi
    if (changes.isMoveModal.currentValue) {
      console.log('Prop value changed to:', changes.isMoveModal.currentValue);
      this.taiLieuSerVice.rootId$.subscribe((idRoot) => {
        this.handleGetDocuments({id: idRoot, name: ''})
      })
    }
  }

  // ngOnInit(): void {
  //   this.taiLieuSerVice.rootId$.subscribe((idRoot) => {
  //     this.handleGetDocuments({id: idRoot, name: ''})
  //   })
  // }

  handleGetDocuments(data: { id: number, name: string }) {
    this.http
      .get<IRootDocument>(`${DOMAIN}/document/${data.id}`)
      .subscribe((res: IRootDocument) => {
        this.rootFolder = res
        const arrFolder: IDataProps[] = [];
        if (res.childDocuments.length > 0) {
          res.childDocuments.forEach((item: IDataProps) => {
            if (item.type === 'folder') {
              arrFolder.push(item);
            }
          });
          this.folderData = [...arrFolder];
        } else {
          this.folderData = [];
        }

      });
  }

  onBackCard() {

    // this.onClickItem.emit({id: documentId, name: documentName})
    if(this.rootFolder.parentId)
      this.handleGetDocuments({id:this.rootFolder.parentId,name:""})
  }

  onClickCard({documentId, documentName}: any) {
    // this.onClickItem.emit({id: documentId, name: documentName})
    this.handleGetDocuments({id:documentId,name:documentName})
  }

}
