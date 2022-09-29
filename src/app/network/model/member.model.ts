import { BabyModel } from "./baby.model";

export class MemberModel {
  Id!: string;
  Name!: string;
  Gender!: string;
  Phone!: string;
  Email!: string;
  PostCode?: string;
  Address?: string;
  SurveyLeft?: number;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}