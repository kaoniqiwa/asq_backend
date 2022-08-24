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
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { MemberModel } from "src/app/network/model/member.model";


@Injectable()
export class MemberOperateBusiness {

  constructor(private _memberRequest: MemberRequestService, private _doctorRequest: DoctorRequestService) {

  }
  create(model: MemberModel) {
    return this._memberRequest.create(model)
  }
  get(id: string) {

    return this._memberRequest.get(id);
  }

  update(model: MemberModel) {
    return this._memberRequest.update(model);
  }
  // addDoctor(cid: string, doctors: DoctorModel[]) {
  //   let arr = doctors.map((doctor) => {
  //     doctor.cid = cid;
  //     doctor.flow = 'addDoctor';
  //     return this._doctorRequest.create(doctor);
  //   }
  //   )
  //   return Promise.all(arr)
  // }
  // deleteDoctor(cid: string, doctors: DoctorModel[]) {
  //   let arr = doctors.map((doctor) => {
  //     let params = new GetDoctorParams();
  //     params.cid = cid;
  //     params.id = doctor.id;
  //     params.flow = 'deleteDoctor';
  //     return this._doctorRequest.delete(params);
  //   }
  //   )
  //   return Promise.all(arr)
  // }
  // editDoctor(doctors: DoctorModel[]) {
  //   let arr = doctors.map((doctor) => {
  //     doctor.flow = "editDoctor";
  //     return this._doctorRequest.update(doctor);
  //   }
  //   )
  //   return Promise.all(arr)

  // }
}