import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {BreadCrumbComponent} from './bread-crumb.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, BreadCrumbComponent],
  exports: [BreadCrumbComponent]

})
export class BreadCrumbModule {
}
