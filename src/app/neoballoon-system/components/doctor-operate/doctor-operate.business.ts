import { Injectable } from "@angular/core";
import { CompanyModel } from "src/app/network/model/company.model";
import { DoctorModel } from "src/app/network/model/doctor.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";



@Injectable()
export class DoctorOperateBusiness {

  constructor(private _doctorRequest: DoctorRequestService) {

  }
  create(model: DoctorModel) {
    return this._doctorRequest.create(model)
  }
  get(id: string) {

    return this._doctorRequest.get(id);
  }
  update(model: DoctorModel) {
    return this._doctorRequest.update(model);
  }
}