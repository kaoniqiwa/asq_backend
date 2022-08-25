import { Injectable } from "@angular/core";
import { OrderModel } from "../../model/order.model";
import { OrdersUrl } from "../../url/orders.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetOrderParams } from "./order.params";

@Injectable({
  providedIn: 'root'
})
export class OrderRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<OrderModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(OrderModel);
  }

  list(params: GetOrderParams = new GetOrderParams()) {
    params.flow = 'listOrders';
    return this.type.paged(OrdersUrl.list(), params)
  }
  create(model: OrderModel) {
    model.flow = 'addOrders'
    return this.type.post(OrdersUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(OrdersUrl.get(id));
  }
  delete(params: GetOrderParams = new GetOrderParams()) {
    params.flow = 'deleteOrders';
    return this.type.post(OrdersUrl.delete(), params)

  }
  update(model: OrderModel) {
    model.flow = 'editOrders'
    return this.type.post(OrdersUrl.update(), model)
  }
  export(params: GetOrderParams = new GetOrderParams()) {
    params.flow = 'exportOrders';
    return this.type.postArray(OrdersUrl.export(), params)
  }


}