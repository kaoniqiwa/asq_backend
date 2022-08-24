import { Gender } from "src/app/enum/gender.enum";
import { Relate } from "src/app/enum/relate.enum";

export class BabyModel {
  id!: string;
  mid!: string;
  m_name!: string;
  m_relate!: Relate;
  name!: string;
  gender!: Gender;
  birthday!: string;
  survey_time!: string;
  premature!: string;
  create_time!: string;
  update_time!: string;
}