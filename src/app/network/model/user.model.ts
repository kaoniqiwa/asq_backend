import { IModel } from './model.interface';
export class User implements IModel {
  id!: string;
  username!: string;
  status!: string;
  name!: string;
  grade!: string;
  create_time!: string;
  update_time!: string;


}
