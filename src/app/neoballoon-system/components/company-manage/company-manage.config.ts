import { CompanyManageModel } from 'src/app/view-model/company-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const CompanyManageConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '编号',
    cell: (element: CompanyManageModel) => `${element.Id}`,
  },
  {
    columnDef: 'CompanyAccount',
    header: '企业账号',
    cell: (element: CompanyManageModel) => `${element.CompanyAccount}`,
  },
  {
    columnDef: 'CompanyName',
    header: '企业名称',
    cell: (element: CompanyManageModel) => `${element.CompanyName}`,
  },
  {
    columnDef: 'ASQLeft',
    header: 'ASQ剩余机会',
    cell: (element: CompanyManageModel) => `${element.ASQLeft}`,
  },

  {
    columnDef: 'SELeft',
    header: 'SE剩余机会',
    cell: (element: CompanyManageModel) => `${element.SELeft}`,
  },

];
