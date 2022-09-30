import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { serialize } from "class-transformer";
import { lastValueFrom } from "rxjs";
import { HwExport } from "src/app/common/tools/hw-export";
import { Time } from "src/app/common/tools/time";
import { CompanyManageConverter } from "src/app/converter/company-manage.converter";
import { MemberManageConverter } from "src/app/converter/member-manage.converter";
import { CompanyModel } from "src/app/network/model/company.model";
import { Page, PagedList } from "src/app/network/model/page-list.model";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { CompanyListModel, CompanyListSearchInfo, CompanyListXLSX } from "src/app/view-model/company-manage.model";
import { MemberManageModel, MemberManageSearchInfo } from "src/app/view-model/member-manage.model";

@Injectable()
export class MemberListBusiness {

  constructor(private _memberRequest: MemberRequestService, private _converter: MemberManageConverter) {

  }
  async init(searchInfo: MemberManageSearchInfo, pageIndex = 1, pageSize = 9) {
    let params = new GetMemberParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    if (searchInfo.name) {
      params.Name = searchInfo.name
    }


    let { Data: Data, Page: Page } = await this._listMember(params);
    let data = this._converter.iterateToModel(Data)
    let res: PagedList<MemberManageModel> = {
      Page: Page,
      Data: data,
    };

    return res;

  }
  private _listMember(params: GetMemberParams = new GetMemberParams()) {
    return this._memberRequest.list(params)
  }
  deletMember(id: string) {
    let params = new GetMemberParams();
    params.Id = id;
    return this._memberRequest.delete(params)
  }
  // getExport(beginTime: Date, endTime: Date) {
  //   let params = new GetCompanyParams();
  //   params.beginTime = Time.beginTime(beginTime);
  //   params.endTime = Time.endTime(endTime);

  //   return this._memberRequest.export(params);
  // }

  // exportXLSX(title: string, header: string[], models: CompanyModel[]) {
  //   let doctorNum: number = 0;
  //   let xlsxModels = models.map((model, index) => {
  //     let xlsxModel = new CompanyManageXLSX();
  //     xlsxModel.id = (index + 1).toString();
  //     xlsxModel.name = model.name;
  //     xlsxModel.account_name = model.account_name
  //     xlsxModel.asq_left = model.asq_left + "";
  //     xlsxModel.asq_total = model.asq_total + "";
  //     xlsxModel.asq_se_left = model.asq_se_left + "";
  //     xlsxModel.asq_se_total = model.asq_se_total + "";
  //     xlsxModel.asq_se2_left = model.asq_se_2_left + "";
  //     xlsxModel.asq_se2_total = model.asq_se_2_total + "";

  //     doctorNum = Math.max(doctorNum, model.doctors.length);
  //     for (let i = 0; i < model.doctors.length; i++) {

  //       xlsxModel['doctor' + (i + 1)] = model.doctors[i].name
  //     }

  //     return xlsxModel;
  //   })
  //   for (let i = 0; i < doctorNum; i++) {
  //     header.push('子账号' + (i + 1))
  //   }

  //   // console.log(xlsxModels)
  //   HwExport.exportXLXS(title, header, xlsxModels);

  // }

}