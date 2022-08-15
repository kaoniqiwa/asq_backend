import { BaseAQSUrl } from "./base.url";

export class CompanyUrl {
  static basic() {
    return `${BaseAQSUrl}/company`;
  }

  static list() {
    return `${this.basic()}/List`;
  }

}