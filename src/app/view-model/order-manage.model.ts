import { OrderType } from "../enum/order-type.enum";

export class OrderManageModel {
  id!: string;
  name!: string;
  phone!: string;
  orderType!: OrderType;
  price!: string;
  createTime!: string;
  flow?: string;

}
export class OrderManageSearchInfo {
  phone!: string;
}

export class OrderManageXLSX {
  id!: string;
  name!: string;
  phone!: string;
  order_type!: OrderType;
  price!: string;
  create_time!: string;
  [key: string]: any;
}