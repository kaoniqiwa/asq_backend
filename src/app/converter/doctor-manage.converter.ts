import { Injectable } from "@angular/core";
import { Doctor } from "../network/model/doctor.model";
import { CompanyOperateModel } from "../view-model/company-operate.model";
import { DoctorManageModel } from "../view-model/doctor-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: "root"
})
export class DoctorManageConverter extends CommonModelConverter<DoctorManageModel>{

  Convert(source: CommonModelSource) {
    if (source instanceof Doctor) {
      return this._fromDoctorModel(source)
    }
    throw new Error('Error');
  }

  private _fromDoctorModel(item: Doctor) {
    let model = new DoctorManageModel();
    model.id = item.Id;
    model.name = item.Name;
    model.level = item.Level || "-";
    model.dept = item.Dept || "-";
    model.phone = item.Phone || "-";
    return model;
  }

}