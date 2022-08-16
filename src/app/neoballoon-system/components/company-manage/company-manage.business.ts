import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { CompanyManageConverter } from "src/app/converter/company-manage.converter";
import { Page, PagedList } from "src/app/network/model/page_list.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { CompanyManageModel, CompanyManageSearchInfo } from "src/app/view-model/company-manage.model";

@Injectable()
export class CompanyManageBusiness {


  constructor(private _companyRequest: CompanyRequestService, private _converter: CompanyManageConverter) {

  }
  async init(searchInfo: CompanyManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetCompanyParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    if (searchInfo.Name) {
      params.Name = searchInfo.Name
    }
    let { Data, Page } = await this._listCompany(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<CompanyManageModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }
  private _listCompany(params: GetCompanyParams = new GetCompanyParams()) {
    return this._companyRequest.list(params)
  }
}