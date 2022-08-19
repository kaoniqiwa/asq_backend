import { PagedParams } from "../IParams.interface";

export class GetCompanyParams extends PagedParams {
  id?: string;
  name?: string;
  accountName?: string;
  flow!: string;
}