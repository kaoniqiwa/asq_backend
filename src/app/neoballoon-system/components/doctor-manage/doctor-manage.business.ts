import { Injectable } from "@angular/core";
import { param } from "jquery";
import { DoctorManageConverter } from "src/app/converter/doctor-manage.converter";
import { GetDoctorParams } from "src/app/network/request/doctor/doctor.params";
import { DoctorRequestService } from "src/app/network/request/doctor/doctor.service";
import { DoctorManageSearchInfo } from "src/app/view-model/doctor-manage.model";

@Injectable()
export class DoctorManageBusiness {

  constructor(private _doctorRequest: DoctorRequestService, private _converter: DoctorManageConverter) {


  }
  async init(searchInfo: DoctorManageSearchInfo) {
    let params = new GetDoctorParams();
    params.Cids = [searchInfo.cid];
    params.Name = searchInfo.name;

    let { Data: Data, Page: Page } = await this._list(params);
    let res = this._converter.iterateToModel(Data)

    return res;
  }
  private _list(params: GetDoctorParams) {
    return this._doctorRequest.list(params)
  }
  delete(cid: string, id: string) {
    let params = new GetDoctorParams();
    params.Cids = [cid];
    params.Ids = [id];

    return this._doctorRequest.delete(params);
  }
}
