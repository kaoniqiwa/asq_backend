import { PagedParams } from "../IParams.interface";

export class GetCompanyParams {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
  name?: string;
  accountName?: string;
  beginTime?: Date;
  endTime?: Date;
  flow!: string;
}