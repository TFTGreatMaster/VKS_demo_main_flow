import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DanhSachComponent} from "../danh-sach/danh-sach.component";


const routes: Routes = [
  {
    path: 'danh-sach',
    component: DanhSachComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class DanhSachRoutingModule {
}
