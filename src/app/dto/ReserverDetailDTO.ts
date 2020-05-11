import {ToolDTO} from './toolDTO';
import {DepartmentDTO} from './DepartmentDTO';

export class ReserverDetailDTO {
  id: number;
  status: string;
  isEnable: number;
  date: string;
  issueTime: string;
  handOverTime: string;
  itemID: any;
  remark: string;
  itemName: string;
  itemDTOS: ToolDTO;
  departmentId: number;
  locationName: string;
  departmentDTO: DepartmentDTO;
}
