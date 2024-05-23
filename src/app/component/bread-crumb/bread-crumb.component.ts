import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';

// import {IBreadCrumbItem} from "../../core/interface/index.interface";

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {
  @Input() items: MenuItem[] | undefined
  @Input() home: MenuItem | undefined;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClickItem: EventEmitter<any> = new EventEmitter<any>()

  clickItem({item}: any): void {
    this.onClickItem.emit(item)
  }
}
