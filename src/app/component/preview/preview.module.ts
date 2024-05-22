import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {PreviewComponent} from './preview.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, PreviewComponent],
  exports: [PreviewComponent]
})
export class PreviewModule {
}
