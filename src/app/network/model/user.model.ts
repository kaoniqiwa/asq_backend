import { Exclude, Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
export class User implements IModel {
  /**	String	唯一标识符	M	R */
  Id!: string;
  /**	String	用户名	M	RW */
  Username!: string;
  /**	String	密码	O	W */
  Name!: string;
  Grade!: number;

}
