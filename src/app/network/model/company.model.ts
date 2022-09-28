import { DoctorModel } from "./doctor.model";

export class CompanyModel {
  Id!: string;
  Name!: string;
  Username!: string;
  Password!: string;
  AsqTotal!: number;
  AsqLeft!: number;
  AsqSeTotal!: number;
  AsqSeLeft!: number;
  AsqSe2Total!: number;
  AsqSe2Left!: number;
  CreateTime?: string;
  UpdateTime?: string;
  Doctors!: DoctorModel[];
  Flow?: string;
}