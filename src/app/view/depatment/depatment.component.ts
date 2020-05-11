import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from '../../dto/TechnicianDTO';
import {MatTableDataSource} from '@angular/material';
import {DepartmentDTO} from '../../dto/DepartmentDTO';
import {DepatmentService} from '../../service/depatment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-depatment',
  templateUrl: './depatment.component.html',
  styleUrls: ['./depatment.component.css']
})
export class DepatmentComponent implements OnInit {

  depatmentDTO: DepartmentDTO = new DepartmentDTO();
  depatmentList: Array<DepartmentDTO> = [];
  depatmenttableList: MatTableDataSource<any>;
  displayedColumns = ['name'];
  searchTXT: string;
  addLocationForm: FormGroup;

  constructor(
    private depatmentService: DepatmentService,
    private formBuilder: FormBuilder
  ) {
    this.getAllDepatment('', 0, 0);
  }

  ngOnInit() {
  }

  checkValues() {
    if (undefined === this.depatmentDTO.location) {
      alert('Place Enter Location');
    } else {
      this.addDepatment();
    }
  }

  addDepatment() {
    this.depatmentDTO.isEnable = 1;
    this.depatmentDTO.name = 'location';
    this.depatmentService.addDepatment(this.depatmentDTO).subscribe(result => {
      if (result) {
        alert('Department Added Success Full');
        this.getAllDepatment('', 0, 0);
        this.depatmentDTO.location = null;
        this.depatmentDTO.name = null;
      }
    });
  }

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
