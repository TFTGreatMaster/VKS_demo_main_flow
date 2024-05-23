import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Router} from "@angular/router";

import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";

import * as dayjs from "dayjs";
import {jwtDecode, JwtPayload} from "jwt-decode";

import {TokenService} from "../../service";
import {IToken} from "../../interface/token/token";

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss'
})
export class TokenComponent implements OnInit {
  token: string = ''

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
    this.tokenService.apiToken().subscribe((res: IToken) => {
      console.log('res', res)
      this.token = res.newAccessToken
      this.setUserLocal()
    })
  }

  onSubmit() {
    if (this.compareToken(this.token)) {
      void this.router.navigate(['/danh-sach'])
    } else {
      alert('Sai token rồi')
    }
  }

  setUserLocal() {
    const tokenServer = jwtDecode(localStorage.getItem('token')!);
    localStorage.setItem('user', JSON.stringify(tokenServer))
  }

  compareToken(tokenUsb: string): boolean {
    const tokenServer: any = jwtDecode(localStorage.getItem('token')!);
    const dataUsb: any = jwtDecode(tokenUsb);
    const diffMinutes = dayjs(tokenServer.iat as number * 1000).diff(dayjs(dataUsb.iat as number * 1000), 'minutes');
    console.log('dataUsb', dataUsb)
    console.log('tokenServer', tokenServer)
    const privateUsb = dataUsb?.privateKey
    const privateServer = dataUsb?.privateKey
    console.log('privateUsb', privateUsb)
    console.log('privateServer', privateServer)
    return diffMinutes < 15

  }
}
