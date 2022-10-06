import { DatePipe, formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Company } from "../network/model/company.model";
import { Order } from "../network/model/order.model";
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
    if (source instanceof Order) {
      return this._fromOrdersModel(source)
    }
    throw new Error('Error');
  }


  private _fromOrdersModel(item: Order) {
    let model = new OrderManageModel();
    model.id = item.Id;
    model.name = item.Name;
    model.phone = item.Phone;
    model.orderType = item.OrderType;
    model.price = item.Price;
    model.createTime = formatDate(item.CreateTime, 'yyy-MM-dd HH:mm:ss', 'zh-CN')


    return model;
  }


}