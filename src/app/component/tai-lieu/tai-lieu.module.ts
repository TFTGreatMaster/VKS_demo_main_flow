import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';

import {TaiLieuRoutingModule} from './tai-lieu-routing.module';

import {TaiLieuComponent} from './tai-lieu.component';
import {SharedModule} from '../../shared/shared.module';
import {BreadCrumbModule} from "../bread-crumb/bread-crumb.module";
import {PreviewModule} from '../preview/preview.module'
import {MoveModule} from "../move/move.module";
import {DefaulCardModule} from '../defaul-card/defaul-card.module'
import {InputTextModule} from "primeng/inputtext";


@NgModule({
    declarations: [TaiLieuComponent],

    imports: [
        CommonModule,
        SharedModule,
        TaiLieuRoutingModule,
        BreadCrumbModule,
        PreviewModule,
        MoveModule,
        DefaulCardModule,
        ButtonModule,
        DialogModule,
        DividerModule,
        FileUploadModule,
        InputTextModule
    ],
    exports: [
        TaiLieuComponent
    ]
})
export class TaiLieuModule {
}
