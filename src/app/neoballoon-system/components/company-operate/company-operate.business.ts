import { Injectable } from "@angular/core";
import { CompanyModel } from "src/app/network/model/company.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { PagedParams } from "src/app/network/request/IParams.interface";
import { CompanyOperateModel } from "src/app/view-model/company-operate.model";

@Injectable()
export class CompanyOperateBusiness {

  constructor(private _companyRequest: CompanyRequestService) {

  }
  create(model: CompanyModel) {
    return this._companyRequest.create(model)
  }
  get(id: string) {
    let params = new GetCompanyParams();
    params.id = id;
    params.flow = 'getCompany';
    return this._companyRequest.get(params);
  }
}