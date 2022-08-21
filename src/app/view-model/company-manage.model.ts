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