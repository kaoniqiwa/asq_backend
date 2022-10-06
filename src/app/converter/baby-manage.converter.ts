import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Baby } from "../network/model/baby.model";
import { Doctor } from "../network/model/doctor.model";
import { BabyManageModel } from "../view-model/baby-manage.model";
import { CompanyOperateModel } from "../view-model/company-operate.model";
import { DoctorManageModel } from "../view-model/doctor-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: "root"
})
export class BabyManageConverter extends CommonModelConverter<BabyManageModel>{

  Convert(source: CommonModelSource) {
    if (source instanceof Baby) {
      return this._fromBabyModel(source)
    }
    throw new Error('Error');
  }

  private _fromBabyModel(item: Baby) {
    let model = new BabyManageModel();
    model.id = item.id;
    model.mid = item.mid;
    model.m_name = item.m_name;
    model.m_relate = item.m_relate;
    model.name = item.name;
    model.gender = item.gender;

    model.birthday = formatDate(item.birthday, 'yyy-MM-dd', 'zh-CN')

    model.survey_time = item.survey_time;
    model.premature = item.premature == 'y' ? '早产' : '足月';
    model.create_time = formatDate(item.create_time, 'yyy-MM-dd', 'zh-CN')
    model.update_time = item.update_time;

    return model;
  }

}