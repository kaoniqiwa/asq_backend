import { DoctorModel } from "../network/model/doctor.model";

export class CompanyManageModel {
  id!: string;
  name!: string;
  username!: string;
  asq_info!: string;
  asq_se_info!: string;
  asq_se2_info!: string;
  doctors!: DoctorModel[];

}
export class CompanyManageSearchInfo {
  name!: string;
  beginTime?: Date;
  endTime?: Date;
}

export class CompanyManageXLSX {
  id!: string;
  name!: string;
  username!: string;
  asq_total!: string;
  asq_left!: string;
  asq_se_total!: string;
  asq_se_left!: string;
  asq_se2_total!: string;
  asq_se2_left!: string;
  [key: string]: any;
}