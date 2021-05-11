import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credential) {
    return new Promise((resolve, reject) => {
      if (credential.email === "test@test.com" && credential.password == "12345") {
        resolve("Login correcto");
      } else reject("Credenciales invalidas");
    });
  }
}
