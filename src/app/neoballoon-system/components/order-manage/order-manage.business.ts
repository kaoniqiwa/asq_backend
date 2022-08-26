import { Injectable } from "@angular/core";
import { HwExport } from "src/app/common/tools/hw-export";
import { Time } from "src/app/common/tools/time";
import { OrderManageConverter } from "src/app/converter/order-manage.converter";
import { OrderModel } from "src/app/network/model/order.model";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetOrderParams } from "src/app/network/request/order/order.params";
import { OrderRequestService } from "src/app/network/request/order/order.service";
import { OrderManageModel, OrderManageSearchInfo, OrderManageXLSX } from "src/app/view-model/order-manage.model";

@Injectable()
export class OrderManageBusiness {


  constructor(private _orderRequest: OrderRequestService, private _converter: OrderManageConverter) {

  }
  async init(searchInfo: OrderManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetOrderParams();
    params.pageIndex = pageIndex;
    params.pageSize = pageSize;
    if (searchInfo.phone) {
      params.phone = searchInfo.phone
    }


    let { data: Data, page: Page } = await this._listCompany(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<OrderManageModel> = {
      page: Page,
      data: data,
    };

    return res;

  }
  private _listCompany(params: GetOrderParams = new GetOrderParams()) {
    return this._orderRequest.list(params)
  }
  deleteOrder(id: string) {
    let params = new GetOrderParams();
    params.id = id;
    return this._orderRequest.delete(params)
  }
  getExport(beginTime: Date, endTime: Date) {
    let params = new GetOrderParams();
    params.beginTime = Time.beginTime(beginTime);
    params.endTime = Time.endTime(endTime);

    return this._orderRequest.export(params);
  }

  exportXLSX(title: string, header: string[], models: OrderModel[]) {
    let doctorNum: number = 0;
    let xlsxModels = models.map((model, index) => {
      let xlsxModel = new OrderManageXLSX();
      xlsxModel.id = (index + 1).toString();
      xlsxModel.name = model.name;
      xlsxModel.phone = model.phone;
      xlsxModel.price = model.price;
      xlsxModel.order_type = model.order_type;
      xlsxModel.create_time = model.create_time

      return xlsxModel;
    })

    // console.log(xlsxModels)
    HwExport.exportXLXS(title, header, xlsxModels);

  }

}