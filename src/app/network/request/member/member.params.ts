export class GetMemberParams {
  PageIndex?: number;
  PageSize?: number;
  Id?: string;
  Name?: string;
  BeginTime?: Date;
  EndTime?: Date;
  Flow!: string;
}