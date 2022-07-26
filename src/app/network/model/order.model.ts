import { OrderType } from "src/app/enum/order-type.enum";

export class Order {
  Id!: string;
  Name!: string;
  Phone!: string;
  OrderType!: OrderType;
  Price!: string;
  CreateTime!: string;
  Flow?: string;
}