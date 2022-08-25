import { Injectable } from "@angular/core";
import { BabyManageConverter } from "src/app/converter/baby-manage.converter";
import { GetBabyParams } from "src/app/network/request/baby/baby.params";
import { BabyRequestService } from "src/app/network/request/baby/baby.service";
import { GetInformParams } from "src/app/network/request/inform/inform.params";
import { InformRequestService } from "src/app/network/request/inform/inform.service";
import { BabyManageSearchInfo } from "src/app/view-model/baby-manage.model";

@Injectable()
export class SendNotifyBusiness {

  constructor(private _informRequest: InformRequestService,) {

  }

  async init() {
    let params = new GetInformParams();

    let data = await this._getInform(params);

    return data;
  }

  private _getInform(params: GetInformParams) {
    return this._informRequest.getInform(params)
  }
}