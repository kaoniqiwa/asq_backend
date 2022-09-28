import { Injectable } from "@angular/core";
import { CompanyModel } from "src/app/network/model/company.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { PagedParams } from "src/app/network/request/IParams.interface";
import { CompanyOperateModel } from "src/app/view-model/company-operate.model";

import * as axios from 'axios';
import { DoctorModel } from "src/app/network/model/doctor.model";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";
import { GetDoctorParams } from "src/app/network/request/doctor/doctor.params";


@Injectable()
export class CompanyOperateBusiness {

  constructor(private _companyRequest: CompanyRequestService, private _doctorRequest: DoctorRequestService) {

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
  addDoctor(cid: string, doctors: DoctorModel[]) {
    let arr = doctors.map((doctor) => {
      doctor.cid = cid;
      doctor.flow = 'addDoctor';
      return this._doctorRequest.create(doctor);
    }
    )
    return Promise.all(arr)
  }
  deleteDoctor(cid: string, doctors: DoctorModel[]) {
    let arr = doctors.map((doctor) => {
      let params = new GetDoctorParams();
      params.cid = cid;
      params.id = doctor.id;
      params.flow = 'deleteDoctor';
      return this._doctorRequest.delete(params);
    }
    )
    return Promise.all(arr)
  }
  editDoctor(doctors: DoctorModel[]) {
    let arr = doctors.map((doctor) => {
      doctor.flow = "editDoctor";
      return this._doctorRequest.update(doctor);
    }
    )
    return Promise.all(arr)

  }
}