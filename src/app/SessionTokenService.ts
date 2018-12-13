import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionTokenService {

  setToken(token: string): void {
    console.log('helloset Toekn');
    localStorage.setItem(TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}