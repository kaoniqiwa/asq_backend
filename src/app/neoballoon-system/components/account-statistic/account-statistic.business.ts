import { Injectable } from "@angular/core";
import { param } from "jquery";
import { GetCompanyParams } from "src/app/network/request/company/company.params";
import { CompanyRequestService } from "src/app/network/request/company/company.service";
import { GetMemberParams } from "src/app/network/request/member/member.params";
import { MemberRequestService } from "src/app/network/request/member/member.service";
import { GetOrderParams } from "src/app/network/request/order/order.params";
import { OrderRequestService } from "src/app/network/request/order/order.service";

@Injectable()
export class AccountStatisticBusiness {

  constructor(private _companyRequest: CompanyRequestService, private _memberRequest: MemberRequestService, private _orderRequest: OrderRequestService) {

  }
  getCompanyList() {
    let params = new GetCompanyParams();
    params.pageIndex = 1;
    params.pageSize = 9527e5;
    return this._companyRequest.list(params)
  }
  getMemberList() {
    let params = new GetMemberParams();
    params.pageIndex = 1;
    params.pageSize = 9527e5;
    return this._memberRequest.list(params);
  }
  getOrderList() {
    let params = new GetOrderParams();
    params.pageIndex = 1;
    params.pageSize = 9527e5;
    return this._orderRequest.list(params);
  }
}