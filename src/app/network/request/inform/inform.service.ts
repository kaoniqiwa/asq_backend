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

  // create(model: InformModel) {
  //   return this.type.post(InformUrl.create(), model);
  // }
  list(params: GetInformParams = new GetInformParams()) {
    params.flow = 'listDoctor';
    return this.type.postArray(InformUrl.list(), params)
  }
  getInform(params: GetInformParams = new GetInformParams()) {
    params.flow = 'getInform';
    return this.type.post(InformUrl.list(), params)
  }

  // delete(params: GetInformParams = new GetInformParams()) {
  //   params.flow = 'deleteDoctor';
  //   return this.type.post(InformUrl.delete(), params)
  // }
  // get(id: string) {
  //   return this.type.get(InformUrl.get(id));
  // }

  // update(model: InformModel) {
  //   return this.type.post(InformUrl.update(), model)

  // }


}