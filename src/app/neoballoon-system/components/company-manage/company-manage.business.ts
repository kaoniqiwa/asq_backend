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
import { CompanyManageModel, CompanyManageSearchInfo, CompanyManageXLSX } from "src/app/view-model/company-manage.model";

@Injectable()
export class CompanyManageBusiness {


  constructor(private _companyRequest: CompanyRequestService, private _converter: CompanyManageConverter) {

  }
  async init(searchInfo: CompanyManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetCompanyParams();
    params.pageIndex = pageIndex;
    params.pageSize = pageSize;
    if (searchInfo.name) {
      params.name = searchInfo.name
    }


    let { data: Data, page: Page } = await this._listCompany(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<CompanyManageModel> = {
      page: Page,
      data: data,
    };

    return res;

  }
  private _listCompany(params: GetCompanyParams = new GetCompanyParams()) {
    return this._companyRequest.list(params)
  }
  deleteCompany(id: string) {
    let params = new GetCompanyParams();
    params.id = id;
    return this._companyRequest.delete(params)
  }
  getExport(beginTime: Date, endTime: Date) {
    let params = new GetCompanyParams();
    params.beginTime = Time.beginTime(beginTime);
    params.endTime = Time.endTime(endTime);

    return this._companyRequest.export(params);
  }

  exportXLSX(title: string, header: string[], models: CompanyModel[]) {
    let doctorNum: number = 0;
    let xlsxModels = models.map((model, index) => {
      let xlsxModel = new CompanyManageXLSX();
      xlsxModel.id = (index + 1).toString();
      xlsxModel.name = model.name;
      xlsxModel.username = model.username
      xlsxModel.asq_left = model.asq_left + "";
      xlsxModel.asq_total = model.asq_total + "";
      xlsxModel.asq_se_left = model.asq_se_left + "";
      xlsxModel.asq_se_total = model.asq_se_total + "";
      xlsxModel.asq_se2_left = model.asq_se_2_left + "";
      xlsxModel.asq_se2_total = model.asq_se_2_total + "";

      doctorNum = Math.max(doctorNum, model.doctors.length);
      for (let i = 0; i < model.doctors.length; i++) {

        xlsxModel['doctor' + (i + 1)] = model.doctors[i].name
      }

      return xlsxModel;
    })
    for (let i = 0; i < doctorNum; i++) {
      header.push('子账号' + (i + 1))
    }

    // console.log(xlsxModels)
    HwExport.exportXLXS(title, header, xlsxModels);

  }

}