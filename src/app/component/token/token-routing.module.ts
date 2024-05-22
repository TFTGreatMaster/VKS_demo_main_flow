import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TokenComponent} from "./token.component";

const routes: Routes = [
  {
    path: 'token',
    component: TokenComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class TokenRoutingModule {
}
