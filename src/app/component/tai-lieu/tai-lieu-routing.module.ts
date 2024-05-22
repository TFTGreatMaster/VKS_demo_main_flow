import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TaiLieuComponent} from './tai-lieu.component';

const routes: Routes = [
  {
    path: 'tai-lieu',
    component: TaiLieuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaiLieuRoutingModule {
}
