import { DoctorModel } from "./doctor.model";

export class CompanyModel {
  id!: string;
  name!: string;
  account_name!: string;
  account_pass!: string;
  asq_total!: number;
  asq_left!: number;
  asq_se_total!: number;
  asq_se_left!: number;
  asq_se_2_total!: number;
  asq_se_2_left!: number;
  create_time?: string;
  update_time?: string;
  doctors!: DoctorModel[];
  flow?: string;
}