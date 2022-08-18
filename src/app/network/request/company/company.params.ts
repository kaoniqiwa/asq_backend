import { PagedParams } from "../IParams.interface";

export class GetCompanyParams extends PagedParams {
  name?: string;
  accountName?: string;
  flow!: string;
}