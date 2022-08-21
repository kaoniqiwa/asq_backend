import { Injectable } from "@angular/core";
import { DoctorModel } from "../network/model/doctor.model";
import { CompanyOperateModel } from "../view-model/company-operate.model";
import { DoctorManageModel } from "../view-model/doctor-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: "root"
})
export class DoctorManageConverter extends CommonModelConverter<DoctorManageModel>{

  Convert(source: CommonModelSource) {
    if (source instanceof DoctorModel) {
      return this._fromDoctorModel(source)
    }
    throw new Error('Error');
  }

  private _fromDoctorModel(item: DoctorModel) {
    let model = new DoctorManageModel();
    model.id = item.id;
    model.name = item.name;
    model.level = item.level || "-";
    model.dept = item.dept || "-";
    model.phone = item.phone || "-";
    return model;
  }

}