
export class GetOrderParams {
  PageIndex?: number;
  PageSize?: number;
  Id?: string;
  Phone?: string;
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}