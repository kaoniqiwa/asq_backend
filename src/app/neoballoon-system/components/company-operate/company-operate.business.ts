import { Injectable } from "@angular/core";
import { CompanyModel } from "src/app/network/model/company.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { PagedParams } from "src/app/network/request/IParams.interface";
import { CompanyOperateModel } from "src/app/view-model/company-operate.model";

import * as axios from 'axios';


@Injectable()
export class CompanyOperateBusiness {

  constructor(private _companyRequest: CompanyRequestService) {

  }
  create(model: CompanyModel) {
    return this._companyRequest.create(model)
  }
  get(id: string) {

    return this._companyRequest.get(id);
  }

  update(model: CompanyModel) {
    return this._companyRequest.update(model);
  }
}