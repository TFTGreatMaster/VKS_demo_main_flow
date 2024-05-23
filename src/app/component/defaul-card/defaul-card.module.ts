import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';

import { DefaulCardComponent } from './defaul-card.component';
import {InputTextModule} from "primeng/inputtext";
import {ImageModule} from "primeng/image";
import {MoveComponent} from "../move/move.component";

@NgModule({
  declarations: [DefaulCardComponent],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        DividerModule,
        DialogModule,
        FormsModule,
        SplitButtonModule,
        InputTextModule,
        ImageModule,
        MoveComponent,
    ],
  exports: [DefaulCardComponent],
})
export class DefaulCardModule {}
