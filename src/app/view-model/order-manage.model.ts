import { OrderType } from "../enum/order-type.enum";

export class OrderManageModel {
  id!: string;
  name!: string;
  phone!: string;
  orderType!: OrderType;
  price!: string;
  createTime!: string;
  updateTime!: string;
  flow?: string;

}
export class OrderManageSearchInfo {
  phone!: string;
}

export class OrderManageXLSX {
  id!: string;
  name!: string;
  account_name!: string;
  asq_total!: string;
  asq_left!: string;
  asq_se_total!: string;
  asq_se_left!: string;
  asq_se2_total!: string;
  asq_se2_left!: string;
  [key: string]: any;
}