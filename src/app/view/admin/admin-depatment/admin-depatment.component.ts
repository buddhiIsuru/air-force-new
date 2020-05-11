import { Component, OnInit } from '@angular/core';
import {DepartmentDTO} from '../../../dto/DepartmentDTO';
import {MatTableDataSource} from '@angular/material';
import {DepatmentService} from '../../../service/depatment.service';

@Component({
  selector: 'app-admin-depatment',
  templateUrl: './admin-depatment.component.html',
  styleUrls: ['./admin-depatment.component.css']
})
export class AdminDepatmentComponent implements OnInit {

  depatmentDTO: DepartmentDTO = new DepartmentDTO();
  depatmentList: Array<DepartmentDTO> = [];
  depatmenttableList: MatTableDataSource<any>;
  displayedColumns = ['location'];
  searchTXT: string;

  constructor(
    private depatmentService: DepatmentService,
  ) {
    this.getAllDepatment('', 0, 0);
  }

  ngOnInit() {
  }

  // addDepatment() {
  //   this.depatmentDTO.isEnable = 1;
  //   this.depatmentService.addDepatment(this.depatmentDTO).subscribe(result => {
  //     if (result) {
  //       alert('Department Added Success Full');
  //       this.getAllDepatment('', 0, 0);
  //     }
  //   });
  // }

  getAllDepatment(text: string, count: number, page: number) {
    this.depatmentService.getAllDepartment(text, count, page).subscribe(result => {
      this.depatmentList = result;
      this.depatmenttableList = new MatTableDataSource(this.depatmentList);
    });
  }

  departmentFilter() {
    console.log(this.searchTXT);
    this.depatmenttableList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }

}
