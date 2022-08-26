import { Injectable } from "@angular/core";
import { InformModel } from "../../model/inform.model";
import { InformUrl } from "../../url/inform.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetInformParams } from "./inform.params";

@Injectable({
  providedIn: 'root'
})
export class InformRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<InformModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(InformModel);
  }

  create(model: InformModel) {
    model.flow = 'addInform';
    return this.type.post(InformUrl.create(), model);
  }
  list(params: GetInformParams = new GetInformParams()) {
    params.flow = 'listInform';
    return this.type.postArray(InformUrl.list(), params)
  }
  getLatestInform(params: GetInformParams = new GetInformParams()) {
    params.flow = 'getLatestInform';
    return this.type.post(InformUrl.getLatest(), params)
  }

  delete(params: GetInformParams = new GetInformParams()) {
    params.flow = 'deleteInform';
    return this.type.post(InformUrl.delete(), params)
  }


}