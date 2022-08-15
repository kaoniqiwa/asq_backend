import { Exclude, Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
export class User implements IModel {
  /**	String	唯一标识符	M	R */
  Id!: string;
  /**	String	用户名	M	RW */
  Username!: string;
  /**	String	密码	O	W */
  Password?: string;
  /**	String	密码HASH值	O	W */
  PasswordHash?: string;
  /**	String	密码SALT值	O	W */
  PasswordSalt?: string;
  /**	String	名字	O	RW */
  FirstName?: string;
  /**	String	姓	O	RW */
  LastName?: string;

}
