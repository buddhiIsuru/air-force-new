import {ToolDTO} from './toolDTO';
import {DepartmentDTO} from './DepartmentDTO';
import {ReserverDetailDTO} from './ReserverDetailDTO';

export class Custom {
  techId: number;
  techName: string;
  userName: string;
  reserve_dto: ReserverDetailDTO;

  // ========================================================//

  status: string;
  isEnable: number;
  date: string;
  issueTime: string;
  handOverTime: string;
  itemID: any;
  remark: string;
  itemName: string;
  itemDTOS: ToolDTO;
  locationName: string;

  // ========================================================//

  constructor() {
  }

  // constructor(techName: string, userName: string, reserve_dto: ReserverDetailDTO) {
  //
  //   this.techName = techName;
  //   this.userName = userName;
  //   this.reserve_dto = reserve_dto;
  // }

}
