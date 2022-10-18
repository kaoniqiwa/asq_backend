import { Gender } from "../enum/gender.enum";
import { Relate } from "../enum/relate.enum";

export class BabyManageModel {
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

}
export class BabyManageSearchInfo {
  mid!: string;
  name!: string;
}