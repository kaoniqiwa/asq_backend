export class GetMemberParams {
  pageIndex?: number;
  pageSize?: number;
  Id?: string;
  name?: string;
  beginTime?: Date;
  endTime?: Date;
  flow!: string;
}