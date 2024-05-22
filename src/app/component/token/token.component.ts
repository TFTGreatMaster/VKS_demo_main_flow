import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";

import * as dayjs from "dayjs";
import {jwtDecode} from "jwt-decode";

import {TokenService} from "../../service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PanelModule,
    ButtonModule
  ],
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss'
})
export class TokenComponent implements OnInit {
  tokenForm!: FormGroup;

  submitted = false;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit() {
    this.tokenForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      'token': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('submit usbtoken')
    void this.router.navigate(['/danh-sach'])
    // this.tokenService.apiToken().subscribe((res) => {
    //   console.log('token', res.newAccessToken)
    //   const usbToken: string = res.newAccessToken
    //   const dataServer = jwtDecode(serverToken);
    //   const dataUsb = jwtDecode(usbToken);
    //   const diffMinutes = dayjs(dataServer.iat as number * 1000).diff(dayjs(dataUsb.iat as number * 1000), 'minutes');
    //   if (diffMinutes < 15) {
    //     this.titleLogin = "token khớp rồi đăng nhập thành công"
    //     this.token = "token khớp rồi đăng nhập thành công"
    //   } else {
    //     this.titleLogin = "token không khớp đâu nhập lại đi"
    //     this.token = "token không khớp đâu nhập lại đi"
    //   }
    // })
  }
}
