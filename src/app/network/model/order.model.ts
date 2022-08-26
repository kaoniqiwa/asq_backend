import { OrderType } from "src/app/enum/order-type.enum";

export class OrderModel {
  id!: string;
  name!: string;
  phone!: string;
  order_type!: OrderType;
  price!: string;
  create_time!: string;
  flow?: string;
}