import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DetailVuAnComponent} from "./detail-vu-an.component";


const routes: Routes = [
  {
    path: 'detail-vu-an',
    component: DetailVuAnComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class DetaiVuAnRoutingModule {
}
