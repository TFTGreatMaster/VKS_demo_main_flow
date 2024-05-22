import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {MoveComponent} from './move.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, MoveComponent],
  exports: [MoveComponent]
})
export class MoveModule {
}
