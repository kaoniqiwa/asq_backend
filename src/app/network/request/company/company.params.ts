import { PagedParams } from "../IParams.interface";

export class GetCompanyParams {
  PageIndex?: number;
  PageSize?: number;
  Id?: string;
  Name?: string;
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}