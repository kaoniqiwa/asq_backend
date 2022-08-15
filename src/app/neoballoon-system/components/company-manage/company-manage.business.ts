import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Page, PagedList } from "src/app/network/model/page_list.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { CompanyManageModel, CompanyManageSearchInfo } from "src/app/view-model/company-manage.model";

@Injectable()
export class CompanyManageBusiness {


  constructor(private _companyRequest: CompanyRequestService) {

  }
  async init(searchInfo: CompanyManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetCompanyParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    this._listCompany(params);

  }
  private _listCompany(params: GetCompanyParams = new GetCompanyParams()) {
    this._companyRequest.list()
  }
}