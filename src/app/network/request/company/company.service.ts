import { Injectable } from "@angular/core";
import { CompanyManageModel } from "src/app/view-model/company-manage.model";
import { CompanyModel } from "../../model/company.model";
import { CompanyUrl } from "../../url/company.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCompanyParams } from "./company.params";

@Injectable({
  providedIn: 'root'
})
export class CompanyRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<CompanyModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(CompanyModel);
  }

  list(params: GetCompanyParams = new GetCompanyParams()) {
    params.flow = 'listCompany';
    return this.type.paged(CompanyUrl.list(), params)
  }
  create(model: CompanyModel) {
    return this.type.post(CompanyUrl.create(), model);
  }
  get(id: string) {
    return this.type.get(CompanyUrl.get(id));
  }
  delete(params: GetCompanyParams = new GetCompanyParams()) {
    params.flow = 'deleteCompany';
    return this.type.post(CompanyUrl.delete(), params)

  }
  update(model: CompanyModel) {
    return this.type.post(CompanyUrl.update(), model)
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