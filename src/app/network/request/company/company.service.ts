import { Injectable } from "@angular/core";
import { CompanyListModel } from "src/app/view-model/company-manage.model";
import { Company } from "../../model/company.model";
import { CompanyUrl } from "../../url/company.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCompanyParams } from "./company.params";

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Company>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Company);
  }

  list(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'listCompany';
    return this.type.paged(CompanyUrl.list(), params)
  }
  create(model: Company) {
    model.Flow = 'addCompany'
    return this.type.post(CompanyUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(CompanyUrl.get(id));
  }
  delete(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'deleteCompany';
    return this.type.post(CompanyUrl.delete(), params)

  }
  update(model: Company) {
    model.Flow = 'editCompany'
    return this.type.post(CompanyUrl.update(), model)
  }
  export(params: GetCompanyParams = new GetCompanyParams()) {
    params.Flow = 'exportCompany';
    return this.type.postArray(CompanyUrl.export(), params)
  }

  // deleteDocotr(params: GetCompanyParams) {
  //   return this.type.delete(companyUrl, params)
  // }

  // list(params: GetCamerasParams = new GetCamerasParams()) {
  //   return this.type.paged(AICamerasUrl.list(), params);
  // }



  // update(item: AICamera) {
  //   return this.type.put(AICamerasUrl.item(item.Id), item)
  // }

  // listAIModels(id: string) {
  //   return this.basic.get(AICamerasUrl.AIModels(id), CameraAIModel)
  // }
  // addAIModel(cameraId: string, modelId: string) {
  //   return this.basic.post(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  // }
  // getAIModel(cameraId: string, modelId: string) {
  //   return this.basic.get(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  // }
  // deleteAIModel(cameraId: string, modelId: string) {
  //   return this.basic.delete(AICamerasUrl.singleAIModel(cameraId, modelId), CameraAIModel)
  // }



}