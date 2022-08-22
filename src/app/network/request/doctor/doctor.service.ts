import { Injectable } from "@angular/core";
import { CompanyManageModel } from "src/app/view-model/company-manage.model";
import { CompanyModel } from "../../model/company.model";
import { DoctorModel } from "../../model/doctor.model";
import { CompanyUrl } from "../../url/company.url";
import { DoctorUrl } from "../../url/doctor.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetDoctorParams } from "./doctor.params";

@Injectable({
  providedIn: 'root'
})
export class DoctorRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<DoctorModel>;

  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(DoctorModel);
  }

  create(model: DoctorModel) {
    return this.type.post(DoctorUrl.create(), model);
  }
  list(params: GetDoctorParams = new GetDoctorParams()) {
    params.flow = 'listDoctor';
    return this.type.postArray(DoctorUrl.list(), params)
  }

  delete(params: GetDoctorParams = new GetDoctorParams()) {
    params.flow = 'deleteDoctor';
    return this.type.post(DoctorUrl.delete(), params)
  }
  get(id: string) {
    return this.type.get(DoctorUrl.get(id));
  }

  update(model: DoctorModel) {
    return this.type.post(DoctorUrl.update(), model)

  }
  // create(model: CompanyModel) {
  //   return this.type.post(CompanyUrl.create(), model);
  // }
  // get(id: string) {
  //   return this.type.get(CompanyUrl.get(id));
  // }


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