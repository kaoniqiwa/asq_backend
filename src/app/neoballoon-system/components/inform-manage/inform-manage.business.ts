import { Injectable } from "@angular/core";
import { InformManageConverter } from "src/app/converter/inform-manage.converter";
import { InformModel } from "src/app/network/model/inform.model";
import { GetInformParams } from "src/app/network/request/inform/inform.params";
import { InformRequestService } from "src/app/network/request/inform/inform.service";

@Injectable()
export class InformManageBusiness {

  constructor(private _informRequest: InformRequestService, private _converter: InformManageConverter) {

  }

  async init() {
    let params = new GetInformParams();
    let res = await this._getInform(params);
    return res;
  }

  private _getInform(params: GetInformParams) {
    return this._informRequest.getLatestInform(params)
  }
  create(model: InformModel) {
    return this._informRequest.create(model)
  }
  delete(id: string) {
    let params = new GetInformParams();
    params.Id = id;
    return this._informRequest.delete(params);
  }
}