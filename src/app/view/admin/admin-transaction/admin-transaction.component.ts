import {Component, OnInit} from '@angular/core';
import {ToolDTO} from '../../../dto/toolDTO';
import {ReserveDTO} from '../../../dto/ReserveDTO';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ToolService} from '../../../service/tool.service';
import {ReservationService} from '../../../service/reservation.service';
import {ToolComponent} from '../../tool/tool.component';
import {Custom} from '../../../dto/Custom';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent implements OnInit {

  toolDto: ToolDTO = new ToolDTO();
  customDto: Custom = new Custom();
  reservationList: Array<ReserveDTO> = [];
  customList: Array<Custom> = [];

  searchTXT: string;
  searchTXTbyID: number;

  tableReservationList: MatTableDataSource<any>;
  displayedColumns = ['item', 'technician', 'Location', 'Issue_time', 'Hand_over_time', 'date', 'status', 'user'];

  constructor(
    private dialog: MatDialog,
    private toolService: ToolService,
    private reserveService: ReservationService,
  ) {
    this.loadAllReservation('', 0, 0);
  }

  ngOnInit() {
  }

  onCreate() {
    this.dialog.open(ToolComponent);
  }

  loadAllReservation(text: string, count: number, page: number) {
    this.reserveService.searchReservation(text, count, page).subscribe(result => {
      this.reservationList = result;

      console.log(JSON.stringify(result) + '  jfsdhfdk');
      for (let i = 0; i < this.reservationList.length; i++) {
        const techId = this.reservationList[i].technicianDTO.name;
        for (let j = 0; j < this.reservationList[i].reserveDetailsDTOS.length; j++) {
          this.customDto.techName = this.reservationList[i].technicianDTO.name;
          this.customDto.userName = this.reservationList[i].userDTO.name;
          this.customDto.itemName = this.reservationList[i].reserveDetailsDTOS[j].itemDTOS.name;
          this.customDto.locationName = this.reservationList[i].reserveDetailsDTOS[j].departmentDTO.location;
          this.customDto.issueTime = this.reservationList[i].reserveDetailsDTOS[j].issueTime;
          this.customDto.handOverTime = this.reservationList[i].reserveDetailsDTOS[j].handOverTime;
          this.customDto.date = this.reservationList[i].reserveDetailsDTOS[j].date;
          this.customDto.status = this.reservationList[i].reserveDetailsDTOS[j].status;
          this.customDto.userName = this.reservationList[i].userDTO.name;
          this.customList.push(this.customDto);
          this.customDto = new Custom();
          console.log('Reserve DTO : ' + [j] + ' : ' + JSON.stringify(this.reservationList[i].reserveDetailsDTOS[j]));
        }
      }
      console.log('Reserve DTO : ============>1 ' + ' : ' + JSON.stringify(this.customList));
      this.tableReservationList = new MatTableDataSource(this.customList);
    });
    console.log('========>' + JSON.stringify(this.customList));
  }

  searchTransaction() {
    this.tableReservationList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }

}
