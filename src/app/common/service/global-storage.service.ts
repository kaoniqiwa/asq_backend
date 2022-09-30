import { EventEmitter, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { User } from 'src/app/network/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStorageService {



  private _user: User | null = null;
  set user(user: User | null) {
    this._user = user;
  }
  get user(): User | null {
    return this._user
  }
  clear() {
    this.user = null;
  }



  constructor() {
  }
}
