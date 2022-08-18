import { Injectable } from "@angular/core";
import { CompanyModel } from "src/app/network/model/company.model";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { CompanyOperateModel } from "src/app/view-model/company-operate.model";

@Injectable()
export class CompanyOperateBusiness {

  constructor(private _companyRequest: CompanyRequestService) {

  }
  create(model: CompanyModel) {
    this._companyRequest.create(model)
  }
}