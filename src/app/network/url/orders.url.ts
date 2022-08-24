import { BaseASQUrl } from "./base.url";

export class OrdersUrl {
  static get basic() {
    return `${BaseASQUrl}/orders`;
  }

  static create() {
    return `${this.basic}.php`;
  }
  static list() {
    return `${this.basic}.php`;
  }
  static get(id: string) {
    return `${this.basic}.php?id=${id}`
  }
  static delete() {
    return `${this.basic}.php`;
  }
  static update() {
    return `${this.basic}.php`;
  }
  static export() {
    return `${this.basic}.php`;
  }
}