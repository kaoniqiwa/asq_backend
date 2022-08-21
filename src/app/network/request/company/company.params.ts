import { PagedParams } from "../IParams.interface";

export class GetCompanyParams {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
  name?: string;
  accountName?: string;
  flow!: string;
}