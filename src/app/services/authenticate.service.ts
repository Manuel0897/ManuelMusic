import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credential) {
    return new Promise(async (resolve, reject) => {
      var users : any[] = await this.storage.get('users');
      var log = false, i = 0;
      while(!log && i < users.length) {
        if (credential.email === users[i].email && btoa(credential.password) == users[i].password) {
          log = true;
        }
        i++;
      }
      if (log) resolve("Login correcto");
      else reject("Credenciales invalidas");
    });
  }

  async registerUser(userData) {
    userData.password = btoa(userData.password);
    var users : any[] = await this.storage.get('users');
    var newUsers = users;
    if (newUsers && newUsers.length > 0) newUsers.push(userData);
    else newUsers = [userData];
    return this.storage.set('users', newUsers);
  }
}
