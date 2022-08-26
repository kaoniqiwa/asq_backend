
export class GetOrderParams {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
  phone?: string;
  beginTime?: Date;
  endTime?: Date;

  flow!: string;
}