import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  validation_message = {
    email: [
      { type: "required",  message: "El email es requerido." },
      { type: "pattern",  message: "Inserte un email valido." },
    ],
    password: [
      { type: "required",  message: "El password es requerido." },
      { type: "minlength",  message: "El password requere al menos 5 digitos." },
    ]
  };

  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then(() => {
      this.errorMessage="";
      this.storage.set('isUserLoggedIn', true);
      this.navCtrl.navigateForward("/menu/home");
    }).catch(err => {
      this.errorMessage=err;
      this.storage.set('isUserLoggedIn', false);
    })
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register");
  }
}
