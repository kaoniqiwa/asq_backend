import { Baby } from "./baby.model";

export class Member {
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