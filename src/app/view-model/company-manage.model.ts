import { DoctorModel } from "../network/model/doctor.model";

export class CompanyManageModel {
  id!: string;
  name!: string;
  account_name!: string;
  asq_info!: string;
  asq_se_info!: string;
  asq_se2_info!: string;
  doctors!: DoctorModel[];

}
export class CompanyManageSearchInfo {
  name!: string;
}

export class CompanyManageXLSX {
  id!: string;
  name!: string;
  account_name!: string;
  asq_total!: string;
  asq_left!: string;
  asq_se_total!: string;
  asq_se_left!: string;
  asq_se2_total!: string;
  asq_se2_left!: string;
  [key: string]: any;
}