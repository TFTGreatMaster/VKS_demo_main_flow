import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";

import {LoginService} from '../../service'

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

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {
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
    // this.loginService.apiLogin(this.loginForm.value).subscribe(() => {
    void this.router.navigate(['/token'])
    // })
  }
}
