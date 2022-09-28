import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { CompanyModel } from "../network/model/company.model";
import { CompanyListModel } from "../view-model/company-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";


@Injectable({
  providedIn: "root"
})
export class CompanyManageConverter extends CommonModelConverter<CompanyListModel> {
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
    let model = new CompanyListModel();
    model.id = item.Id;
    model.doctors = item.Doctors;
    model.name = item.Name;
    model.username = item.Username;
    model.asq_info = `${item.AsqLeft ??
      "-"}/${item.AsqTotal ?? "-"}`;
    model.asq_se_info = `${item.AsqSeLeft ?? "-"}/${item.AsqSeTotal ?? "-"}`;
    model.asq_se2_info = `${item.AsqSe2Left ?? "_"}/${item.AsqSe2Total ?? "_"}`;
    return model;
  }


}