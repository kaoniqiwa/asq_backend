import { Injectable } from "@angular/core";
import { Baby } from "src/app/network/model/baby.model";
import { Company } from "src/app/network/model/company.model";
import { Doctor } from "src/app/network/model/doctor.model";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";



@Injectable()
export class BabyOperateBusiness {

  constructor(private _babyRequest: BabyRequestService) {

  }
  create(model: Baby) {
    return this._babyRequest.create(model)
  }
  // get(id: string) {

  //   return this._babyRequest.get(id);
  // }
  // update(model: DoctorModel) {
  //   return this._babyRequest.update(model);
  // }
}