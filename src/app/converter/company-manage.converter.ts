import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CompanyModel } from "../network/model/conpany.model";
import { CompanyManageModel } from "../view-model/company-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";


@Injectable({
  providedIn: "root"
})
export class CompanyManageConverter extends CommonModelConverter<CompanyManageModel> {
  constructor() {
    super();
  }
  Convert(source: CommonModelSource) {
    if (source instanceof CompanyModel) {
      return this._fromCompanyModel(source)
    }
    throw new Error('Error');
  }


  private _fromCompanyModel(item: CompanyModel) {
    let model = new CompanyManageModel();
    model.Id = item.id.padStart(3, '0');
    model.CompanyAccount = item.a_name;
    model.CompanyName = item.name;
    model.ASQInfo = `${item.asq_l ??
      "-"}/${item.asq_t ?? "-"}`;
    model.ASQSEInfo = `${item.asq_se_l ?? "-"}/${item.asq_se_t ?? "-"}`;
    model.ASQSE2Info = `${item.asq_se_2_l ?? "_"}/${item.asq_se_2_t ?? "_"}`;
    return model;
  }


}