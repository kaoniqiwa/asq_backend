import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CompanyModel } from "../network/model/company.model";
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
    model.id = item.id;
    model.name = item.name;
    model.account_name = item.account_name;
    model.asq_info = `${item.asq_left ??
      "-"}/${item.asq_total ?? "-"}`;
    model.asq_se_info = `${item.asq_se_left ?? "-"}/${item.asq_se_total ?? "-"}`;
    model.asq_se2_info = `${item.asq_se_2_left ?? "_"}/${item.asq_se_2_total ?? "_"}`;
    return model;
  }


}