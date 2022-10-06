import { Baby } from "../network/model/baby.model";

export class MemberManageModel {
  id!: string;
  name!: string;
  gender!: string;
  phone!: string;
  address!: string;
  surveyLeft!: number;
  create_time!: string;
  babys!: Baby[];

}
export class MemberManageSearchInfo {
  name!: string;
  beginTime?: Date;
  endTime?: Date;
}

// export class CompanyManageXLSX {
//   id!: string;
//   name!: string;
//   account_name!: string;
//   asq_total!: string;
//   asq_left!: string;
//   asq_se_total!: string;
//   asq_se_left!: string;
//   asq_se2_total!: string;
//   asq_se2_left!: string;
//   [key: string]: any;
// }