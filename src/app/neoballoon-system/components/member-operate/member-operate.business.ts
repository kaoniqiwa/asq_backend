import { Injectable } from "@angular/core";
import { Company } from "src/app/network/model/company.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { PagedParams } from "src/app/network/request/IParams.interface";
import { CompanyOperateModel } from "src/app/view-model/company-operate.model";

import * as axios from 'axios';
import { Doctor } from "src/app/network/model/doctor.model";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";
import { GetDoctorParams } from "src/app/network/request/doctor/doctor.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { Member } from "src/app/network/model/member.model";


@Injectable()
export class MemberOperateBusiness {

  constructor(private _memberRequest: MemberRequestService, private _doctorRequest: DoctorRequestService) {

  }
  create(model: Member) {
    return this._memberRequest.create(model)
  }
  get(id: string) {

    return this._memberRequest.get(id);
  }

  update(model: Member) {
    return this._memberRequest.update(model);
  }
  listDoctor() {
    return this._doctorRequest.list()
  }

}