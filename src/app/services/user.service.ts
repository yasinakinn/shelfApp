import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'http://localhost:8000/';
  private onLogin = new Subject<any>();
  
  constructor(
    private storage: Storage
  ) { 
    this.storage.create();
  }

  async login(username: string, password: string) {
    let body = {
      "email": username,
      "password": password
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let url = this.baseURL + 'user/login';
    return await fetch(url, {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: myHeaders,
      redirect: 'follow'
    }).then(response => response.json());
  }

  async logout() {
    await this.storage.remove('login');
    await this.storage.remove('user');
  }

  async isLoggedIn() {
    return await this.storage.get('login');
  }

  async setUser(user: any) {
    await this.storage.set('login', true);
    await this.storage.set('user', user);
  }

  async loginEvent(data: any) {
    this.onLogin.next(data);
  }

  async getLoginEvent(): Promise<Subject<any>> {
    return this.onLogin;
  }
}
