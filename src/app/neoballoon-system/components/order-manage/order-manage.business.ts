import { Injectable } from "@angular/core";
import { HwExport } from "src/app/common/tools/hw-export";
import { Time } from "src/app/common/tools/time";
import { OrderManageConverter } from "src/app/converter/order-manage.converter";
import { Order } from "src/app/network/model/order.model";
import { PagedList } from "src/app/network/model/page-list.model";
import { GetOrderParams } from "src/app/network/request/order/order.params";
import { OrderRequestService } from "src/app/network/request/order/order.service";
import { OrderManageModel, OrderManageSearchInfo, OrderManageXLSX } from "src/app/view-model/order-manage.model";

@Injectable()
export class OrderManageBusiness {


  constructor(private _orderRequest: OrderRequestService, private _converter: OrderManageConverter) {

  }
  async init(searchInfo: OrderManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetOrderParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    if (searchInfo.phone) {
      params.Phone = searchInfo.phone
    }


    let { Data: Data, Page: Page } = await this._listOrder(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<OrderManageModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }
  private _listOrder(params: GetOrderParams = new GetOrderParams()) {
    return this._orderRequest.list(params)
  }
  deleteOrder(id: string) {
    let params = new GetOrderParams();
    params.Id = id;
    return this._orderRequest.delete(params)
  }
  async getExport(beginTime: Date, endTime: Date) {
    let params = new GetOrderParams();
    params.BeginTime = Time.beginTime(beginTime);
    params.EndTime = Time.endTime(endTime);
    return this._orderRequest.export(params);
  }

  exportXLSX(title: string, header: string[], models: Order[]) {
    let xlsxModels = models.map((model, index) => {
      let xlsxModel = new OrderManageXLSX();
      xlsxModel.id = (index + 1).toString();
      xlsxModel.name = model.Name;
      xlsxModel.phone = model.Phone;
      xlsxModel.price = model.Price;
      xlsxModel.order_type = model.OrderType;
      xlsxModel.create_time = model.CreateTime

      return xlsxModel;
    })

    HwExport.exportXLXS(title, header, xlsxModels);

  }

}