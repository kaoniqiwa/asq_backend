export class SidenavModel {
  title: string = '';
  path?: string = '';
  state?: string = '';
  children?: Array<SidenavModel> = [];
}
