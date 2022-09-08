import { Exclude, Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
export class User implements IModel {
  id!: string;
  username!: string;
  status!: string;
  name!: string;
  grade!: string;
  create_time!: string;
  udate_time!: string;


}
