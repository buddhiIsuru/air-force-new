import {TechnicianDTO} from './TechnicianDTO';
import {DepartmentDTO} from './DepartmentDTO';
import {ReserverDetailDTO} from './ReserverDetailDTO';
import {UserDTO} from './userDTO';

export class ReserveDTO {
  id: number;
  issueDate: string;
  issueTime: string;
  remark: string;
  handOverTime: string;
  status: string;
  isEnable: number;
  technicianId: number;
  technicianDTO: TechnicianDTO;
  userId: number;
  userDTO: UserDTO;
  departmentId: number;
  departmentDTO: DepartmentDTO;
  reserveDetailsDTOS: Array<ReserverDetailDTO>;
}
