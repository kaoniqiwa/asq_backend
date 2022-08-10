import { Page, PagedList } from "src/app/network/model/page_list.model";
import { CompanyManageModel } from "src/app/view-model/company-manage.model";

export class CompanyManageBusiness {


  constructor() {

  }
  init() {
    let data: CompanyManageModel[] = []
    for (let i = 0; i < 9; i++) {
      let model = new CompanyManageModel();
      model.Id = (i + 1).toString();
      model.CompanyAccount = 'changhekm';

      model.CompanyName = "昆明长和天城康复医院";
      model.ASQLeft = '200';
      model.SELeft = '0';
      model.CreateTime = "2022-07-31 16:19:36-2";

      data.push(model)
    }

    let page: Page = {
      PageIndex: 1,
      PageSize: 9,
      PageCount: 367,
      RecordCount: 9,
      TotalRecordCount: 3398
    }
    let res: PagedList<CompanyManageModel> = {
      Page: page,
      Data: data,
    };
    return res;

  }
}