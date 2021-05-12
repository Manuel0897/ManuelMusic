import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  validation_message = {
    name: [
      { type: "required",  message: "El nombre es requerido." }
    ],
    lastName: [
      { type: "required",  message: "El apellido es requerido." }
    ],
    email: [
      { type: "required",  message: "El email es requerido." },
      { type: "pattern",  message: "Inserte un email valido." },
    ],
    password: [
      { type: "required",  message: "El password es requerido." },
      { type: "minlength",  message: "El password requere al menos 5 digitos." },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthenticateService,
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl("", Validators.compose([
        Validators.required
      ])),
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

  ngOnInit() {
  }

  goToLogin() {
    this.navCtrl.navigateBack("/login");
  }

  registerUser(userData) {
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack("/login");
    })
  }
}
