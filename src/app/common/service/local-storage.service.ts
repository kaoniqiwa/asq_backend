import { Injectable } from '@angular/core';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2022-08-15 10:23:55
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  // set user(user: User) {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }
  // get user(): User {
  //   let user = localStorage.getItem('user');
  //   return user ? JSON.parse(user) : null;
  // }
  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
