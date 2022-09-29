import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { mode } from "crypto-js";
import { CompanyModel } from "../network/model/company.model";
import { MemberModel } from "../network/model/member.model";
import { CompanyListModel } from "../view-model/company-manage.model";
import { MemberManageModel } from "../view-model/member-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";


@Injectable({
  providedIn: "root"
})
export class MemberManageConverter extends CommonModelConverter<MemberManageModel> {
  constructor() {
    super();
  }
  Convert(source: CommonModelSource) {
    if (source instanceof MemberModel) {
      return this._fromMemberModel(source)
    }
    throw new Error('Error');
  }


  private _fromMemberModel(item: MemberModel) {
    let model = new MemberManageModel();
    model.id = item.Id;
    model.name = item.Name;
    model.gender = item.Gender;
    model.phone = item.Phone;
    model.address = item.Address || "-";
    model.surveyLeft = item.SurveyLeft || 0;
    model.create_time = item.CreateTime || '-';
    return model;
  }


}