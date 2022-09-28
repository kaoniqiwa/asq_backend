import { DatePipe, formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { CompanyModel } from "../network/model/company.model";
import { OrderModel } from "../network/model/order.model";
import { CompanyListModel } from "../view-model/company-manage.model";
import { OrderManageModel } from "../view-model/order-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";


@Injectable({
  providedIn: "root"
})
export class OrderManageConverter extends CommonModelConverter<OrderManageModel> {
  constructor() {
    super();
  }
  Convert(source: CommonModelSource) {
    if (source instanceof OrderModel) {
      return this._fromOrdersModel(source)
    }
    throw new Error('Error');
  }


  private _fromOrdersModel(item: OrderModel) {
    let model = new OrderManageModel();
    model.id = item.id;
    model.name = item.name;
    model.phone = item.phone;
    model.orderType = item.order_type;
    model.price = item.price;
    model.createTime = formatDate(item.create_time, 'yyy-MM-dd HH:mm:ss', 'zh-CN')


    return model;
  }


}