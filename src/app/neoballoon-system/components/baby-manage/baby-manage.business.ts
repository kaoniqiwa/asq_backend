import { Injectable } from "@angular/core";
import { BabyManageConverter } from "src/app/converter/baby-manage.converter";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { BabyManageSearchInfo } from "src/app/view-model/baby-manage.model";

@Injectable()
export class BabyManageBusiness {

  constructor(private _babyRequest: BabyRequestService, private _converter: BabyManageConverter) {

  }

  async init(searchInfo: BabyManageSearchInfo) {
    let params = new GetBabyParams();
    params.Mids = [searchInfo.mid];
    params.Name = searchInfo.name;

    let { Data: data } = await this._list(params);
    let res = this._converter.iterateToModel(data)

    return res;
  }

  private _list(params: GetBabyParams) {
    return this._babyRequest.list(params)
  }
}