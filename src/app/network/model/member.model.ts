import { BabyModel } from "./baby.model";

export class MemberModel {
  Id!: string;
  Did!: string;
  Name!: string;
  Gender!: string;
  Phone!: string;
  Email!: string;
  PostCode?: string;
  Address?: string;
  CreateTime?: string;
  UpdateTime?: string;
  Flow?: string;
}