export class SidenavModel {
  title: string = '';
  id: string = '';
  path?: string = '';
  state?: string = '';
  children?: Array<SidenavModel> = [];
}
