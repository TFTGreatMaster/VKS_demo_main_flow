import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";

import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";

import {LoginService} from '../../service'
import {isModeOffline} from "../../util/common";
import {MainService} from "../../service/main/main.service";
import {MODE_PROJECT} from "../../interface/main/main";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PanelModule,
    ButtonModule
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  submitted = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private mainService: MainService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      'username': new FormControl('', Validators.required),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    this.mainService.mode$.subscribe((mode: MODE_PROJECT) => {
      if (isModeOffline(mode)) {
        const user = localStorage.getItem('user')
        const dataUser = JSON.parse(user || '')
        const valueForm: { username: string, password: string } = this.loginForm.value
        if (dataUser.username === valueForm.username && dataUser.password === valueForm.password) {
          void this.router.navigate(['/token'])
        } else {
          console.log('Đăng nhập thất bại')
        }
      } else {
        this.loginService.apiLogin(this.loginForm.value).subscribe((res) => {
          if (res && res.message === "Đăng nhập thành công") {
            localStorage.setItem('token', res.token)
            void this.router.navigate(['/token'])
          } else {
            console.log('Đăng nhập thất bại')
            this.submitted = false;
          }
        })
      }
    })
  }
}
