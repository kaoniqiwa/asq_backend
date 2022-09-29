import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { serialize } from "class-transformer";
import { lastValueFrom } from "rxjs";
import { HwExport } from "src/app/common/tools/hw-export";
import { Time } from "src/app/common/tools/time";
import { CompanyManageConverter } from "src/app/converter/company-manage.converter";
import { CompanyModel } from "src/app/network/model/company.model";
import { Page, PagedList } from "src/app/network/model/page_list.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { CompanyListModel, CompanyListSearchInfo, CompanyListXLSX } from "src/app/view-model/company-manage.model";

@Injectable()
export class CompanyListBusiness {


  constructor(private _companyRequest: CompanyRequestService, private _converter: CompanyManageConverter) {

  }
  async init(searchInfo: CompanyListSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetCompanyParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    if (searchInfo.name) {
      params.Name = searchInfo.name.trim();
    }


    let { Data: Data, Page: Page } = await this._listCompany(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<CompanyListModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }
  private _listCompany(params: GetCompanyParams = new GetCompanyParams()) {
    return this._companyRequest.list(params)
  }
  deleteCompany(id: string) {
    let params = new GetCompanyParams();
    params.Id = id;
    return this._companyRequest.delete(params)
  }
  getExport(beginTime: Date, endTime: Date) {
    let params = new GetCompanyParams();
    params.BeginTime = Time.beginTime(beginTime);
    params.EndTime = Time.endTime(endTime);

    return this._companyRequest.export(params);
  }

  exportXLSX(title: string, header: string[], models: CompanyModel[]) {
    // let doctorNum: number = 0;
    // let xlsxModels = models.map((model, index) => {
    //   let xlsxModel = new CompanyListXLSX();
    //   xlsxModel.id = (index + 1).toString();
    //   xlsxModel.name = model.Name;
    //   xlsxModel.username = model.Username
    //   xlsxModel.asq_left = model.AsqLeft + "";
    //   xlsxModel.asq_total = model.AsqTotal + "";
    //   xlsxModel.asq_se_left = model.AsqSeLeft + "";
    //   xlsxModel.asq_se_total = model.AsqSeTotal + "";
    //   xlsxModel.asq_se2_left = model.AsqSe2Left + "";
    //   xlsxModel.asq_se2_total = model.AsqSe2Total + "";

    //   doctorNum = Math.max(doctorNum, model.Doctors.length);
    //   for (let i = 0; i < model.Doctors.length; i++) {

    //     xlsxModel['doctor' + (i + 1)] = model.Doctors[i].name
    //   }

    //   return xlsxModel;
    // })
    // for (let i = 0; i < doctorNum; i++) {
    //   header.push('子账号' + (i + 1))
    // }

    // // console.log(xlsxModels)
    // HwExport.exportXLXS(title, header, xlsxModels);

  }
  getData() {

  }

}