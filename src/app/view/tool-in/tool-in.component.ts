import {Component, OnInit} from '@angular/core';
import {ReserveDTO} from '../../dto/ReserveDTO';
import {ReserverDetailDTO} from '../../dto/ReserverDetailDTO';
import {ReservationService} from '../../service/reservation.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material';
import {Toolinmodule} from './toolinmodule';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {TechnicianDTO} from '../../dto/TechnicianDTO';

@Component({
  selector: 'app-tool-in',
  templateUrl: './tool-in.component.html',
  styleUrls: ['./tool-in.component.css']
})
export class ToolInComponent implements OnInit {

  toolIn: Toolinmodule = new Toolinmodule();
  toolReserve: ReserveDTO = new ReserveDTO();
  reseveList: Array<ReserveDTO> = [];
  technicianDTO: TechnicianDTO = new TechnicianDTO();
  reserveDetails: Array<ReserverDetailDTO> = [];
  checkboxes = [];

  currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  hoDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

  displayedColumns = ['Reservation_ID', 'Remark', 'ISSUE_DATE', 'USER', 'STATUS', 'SUBMIT'];
  displayedColumns1: string[] = ['select', 'Item_ID', 'item_code' , 'ddd', 'Date', 'Remark'];
  dataSource = new MatTableDataSource<ReserveDTO>(this.reseveList);
  dataSourceTool = new MatTableDataSource<ReserverDetailDTO>(this.reserveDetails);
  selection = new SelectionModel<ReserveDTO>(true, []);

  reserveId: number;
  remark: string;
  department: string;
  technician: string;
  technicianName: string;
  technicianNumber: string;
  technicianRank: string;
  technicianTrade: string;
  techniciancompedencyLevel: string;
  technicianserviceNumber: string;
  resId: number;
  depatmentid: number;

  constructor(
    private reservationService: ReservationService,
    private rout: ActivatedRoute,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  searchReservationId(id: number) {
    this.reservationService.searchReservationIdList(id).subscribe(result => {
      if (result.length === 0) {
        alert('This Technician All Reservation Has Hand Over');
      } else {
        this.reseveList = result;
        this.technicianDTO = this.reseveList[0].technicianDTO;
        this.technicianName = this.reseveList[0].technicianDTO.name;
        this.technicianNumber = this.reseveList[0].technicianDTO.number;
        this.technicianRank = this.reseveList[0].technicianDTO.rank;
        this.technicianTrade = this.reseveList[0].technicianDTO.trade;
        this.techniciancompedencyLevel = this.reseveList[0].technicianDTO.compedencyLevel;
        this.technicianserviceNumber = this.reseveList[0].technicianDTO.serviceNumber;
        this.dataSource = new MatTableDataSource(this.reseveList);
      }
    });
  }

  AddReserveTable(id: number) {
    console.log('<<<<<<<<<<<<<<<  ' + id + ' >>>>>>>>>>>>>>>>>>');
    this.resId = id;

    for (let i = 0; i < this.reseveList.length; i++) {
      if (id === this.reseveList[i].id) {
        this.reserveDetails = this.reseveList[i].reserveDetailsDTOS;
        // for (let j = 0; j < this.reseveList[i].reserveDetailsDTOS.length; j++) {
        //   this.reserveDetails[i].itemDTOS[j] = this.reseveList[i].reserveDetailsDTOS[j].itemDTOS;
        // }
      }
    }
    this.dataSourceTool = new MatTableDataSource(this.reserveDetails);
  }

  updateRservation() {

    for (let k = 0; k < this.checkboxes.length; k++) {
      const tk = this.checkboxes[k];
      for (let i = 0; i < this.reseveList.length; i++) {
        if (this.resId === this.reseveList[i].id) {
          this.toolReserve.id = this.resId;
          this.toolReserve.isEnable = 1;
          this.toolReserve.issueDate = this.reseveList[i].issueDate;
          this.toolReserve.remark = this.reseveList[i].remark;
          this.toolReserve.status = this.reseveList[i].status;
          this.toolReserve.departmentId = this.reseveList[i].departmentId;
          this.toolReserve.technicianId = this.reseveList[i].technicianId;
          this.toolReserve.userId = this.reseveList[i].userId;
          this.toolReserve.reserveDetailsDTOS = this.reseveList[i].reserveDetailsDTOS;
          for (let j = 0; j < this.reseveList[i].reserveDetailsDTOS.length; j++) {
            const h = this.reseveList[i].reserveDetailsDTOS[j].id;
            if (tk === h) {
              this.toolReserve.reserveDetailsDTOS[j].id = h;
              this.toolReserve.reserveDetailsDTOS[j].status = 'HANDOVER';
              this.toolReserve.reserveDetailsDTOS[j].handOverTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
              this.toolReserve.reserveDetailsDTOS[j].isEnable = 1;
            }
          }
        }
      }
    }
    // this.toolReserve.issueTime = '03:23:07';
    this.toolReserve.handOverTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
    this.reservationService.toolHandOver(this.toolReserve).subscribe(result => {
      if (result) {
        alert('Tool Reservation Submit');
        this.toolReserve = new ReserveDTO();
        this.reserveId = null;
        this.dataSource = new MatTableDataSource();
        this.dataSourceTool = new MatTableDataSource();
        this.toolReserve = new ReserveDTO();
        this.checkboxes = [];
        this.technicianName = null;
        this.technicianNumber = null;
        this.technicianRank = null;
        this.technicianTrade = null;
        this.techniciancompedencyLevel = null;
        this.technicianserviceNumber = null;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ReserveDTO): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  stopPropagation() {
    console.log('hhhhhhhhhhhhhhhh');
  }

  updateItem(e, row) {
    if (e.target.checked) {
      this.checkboxes.push(row);
    } else {
      const updateItem = this.checkboxes.find(this.findIndexToUpdate, row);

      const index = this.checkboxes.indexOf(updateItem);

      this.checkboxes.splice(index, 1);
      console.log(this.checkboxes);
    }
  }

  findIndexToUpdate(type) {
    return type.id === this;
  }

  clear() {
  }

}
