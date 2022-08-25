import { Injectable } from "@angular/core";
import { CompanyManageModel } from "src/app/view-model/company-manage.model";
import { BabyModel } from "../../model/baby.model";
import { CompanyModel } from "../../model/company.model";
import { BabyUrl } from "../../url/baby.url";
import { CompanyUrl } from "../../url/company.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetBabyParams } from "./baby.params";

@Injectable({
  providedIn: 'root'
})
export class BabyRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<BabyModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(BabyModel);
  }

  create(model: BabyModel) {
    return this.type.post(BabyUrl.create(), model);
  }
  list(params: GetBabyParams = new GetBabyParams()) {
    params.flow = 'listBaby';
    return this.type.postArray(BabyUrl.list(), params)
  }

  delete(params: GetBabyParams = new GetBabyParams()) {
    params.flow = 'deleteBaby';
    return this.type.post(BabyUrl.delete(), params)
  }
  get(id: string) {
    return this.type.get(BabyUrl.get(id));
  }

  update(model: BabyModel) {
    return this.type.post(BabyUrl.update(), model)

  }


}