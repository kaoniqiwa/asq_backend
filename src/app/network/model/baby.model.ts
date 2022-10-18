import { Gender } from "src/app/enum/gender.enum";
import { Relate } from "src/app/enum/relate.enum";

export class Baby {
  id!: string;
  mid!: string;
  m_name!: string;
  m_relate!: Relate;
  name!: string;
  gender!: Gender;
  birthday!: string;
  survey_time!: string;
  premature!: string;
  prematrueweek?: string;
  prematrueday?: string;
  rectifyage?: any;
  create_time!: string;
  update_time!: string;
  flow?: string;

}