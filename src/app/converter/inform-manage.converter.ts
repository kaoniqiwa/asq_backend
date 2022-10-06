import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Inform } from "../network/model/inform.model";
import { InformManageModel } from "../view-model/inform-manage.model";
import { CommonModelConverter, CommonModelSource } from "./common-model.converter";

@Injectable({
  providedIn: "root"
})
export class InformManageConverter extends CommonModelConverter<InformManageModel>{

  Convert(source: CommonModelSource) {
    if (source instanceof Inform) {
      return this._fromInformModel(source)
    }
    throw new Error('Error');
  }

  private _fromInformModel(item: Inform) {
    let model = new InformManageModel();
    model.id = item.Id;
    model.content = item.Content;
    model.createTime = formatDate(item.CreateTime, 'yyy-MM-dd', 'zh-CN');
    return model;
  }

}