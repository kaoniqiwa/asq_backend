import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { InformModel } from "../network/model/inform.model";
import { InformManageModel } from "../view-model/inform-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: "root"
})
export class InformManageConverter extends CommonModelConverter<InformManageModel>{

  Convert(source: CommonModelSource) {
    if (source instanceof InformModel) {
      return this._fromInformModel(source)
    }
    throw new Error('Error');
  }

  private _fromInformModel(item: InformModel) {
    let model = new InformManageModel();
    model.id = item.id;
    model.content = item.content;
    model.createTime = formatDate(item.create_time, 'yyy-MM-dd', 'zh-CN');
    return model;
  }

}