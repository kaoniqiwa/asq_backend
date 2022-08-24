import { Injectable } from "@angular/core";
import { OrderManageConverter } from "src/app/converter/order-manage.converter";
import { OrderModel } from "src/app/network/model/order.model";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetOrderParams } from "src/app/network/request/order/order.params";
import { OrderRequestService } from "src/app/network/request/order/order.service";
import { OrderManageModel, OrderManageSearchInfo } from "src/app/view-model/order-manage.model";

@Injectable()
export class OrderManageBusiness {


  constructor(private _companyRequest: OrderRequestService, private _converter: OrderManageConverter) {

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
    return this._companyRequest.list(params)
  }
  deleteCompany(id: string) {
    let params = new GetOrderParams();
    params.id = id;
    return this._companyRequest.delete(params)
  }
  getExport(beginTime: Date, endTime: Date) {
    // let params = new GetOrderParams();
    // params.beginTime = Time.beginTime(beginTime);
    // params.endTime = Time.endTime(endTime);

    // return this._companyRequest.export(params);
  }

  exportXLSX(title: string, header: string[], models: OrderModel[]) {
    // let doctorNum: number = 0;
    // let xlsxModels = models.map((model, index) => {
    //   let xlsxModel = new CompanyManageXLSX();
    //   xlsxModel.id = (index + 1).toString();
    //   xlsxModel.name = model.name;
    //   xlsxModel.account_name = model.account_name
    //   xlsxModel.asq_left = model.asq_left + "";
    //   xlsxModel.asq_total = model.asq_total + "";
    //   xlsxModel.asq_se_left = model.asq_se_left + "";
    //   xlsxModel.asq_se_total = model.asq_se_total + "";
    //   xlsxModel.asq_se2_left = model.asq_se_2_left + "";
    //   xlsxModel.asq_se2_total = model.asq_se_2_total + "";

    //   doctorNum = Math.max(doctorNum, model.doctors.length);
    //   for (let i = 0; i < model.doctors.length; i++) {

    //     xlsxModel['doctor' + (i + 1)] = model.doctors[i].name
    //   }

    //   return xlsxModel;
    // })
    // for (let i = 0; i < doctorNum; i++) {
    //   header.push('子账号' + (i + 1))
    // }

    // // console.log(xlsxModels)
    // HwExport.exportXLXS(title, header, xlsxModels);

  }

}