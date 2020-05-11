import {Component, OnInit} from '@angular/core';
import {TechnicianDTO} from '../../../dto/TechnicianDTO';
import {MatTableDataSource} from '@angular/material';
import {TechnicianService} from '../../../service/technician.service';

@Component({
  selector: 'app-admin-technician',
  templateUrl: './admin-technician.component.html',
  styleUrls: ['./admin-technician.component.css']
})
export class AdminTechnicianComponent implements OnInit {

  technicianDTO: TechnicianDTO = new TechnicianDTO();
  technicianList: Array<TechnicianDTO> = [];
  tableList: MatTableDataSource<any>;
  displayedColumns = ['name', 'number', 'rank', 'cl', 'snum', 'trade'];
  searchTXT: string;

  constructor(
    private technicianService: TechnicianService,
  ) {
    this.getAllTechnician('', 0, 0);
  }

  ngOnInit() {
  }

  // addTechnician() {
  //   this.technicianDTO.isEnable = 1;
  //   this.technicianService.addTechnician(this.technicianDTO).subscribe(result => {
  //     if (result) {
  //       alert('Add Technician Success');
  //       this.getAllTechnician('', 0, 0);
  //     }
  //   });
  // }

  getAllTechnician(text: string, count: number, page: number) {
    this.technicianService.getAllTechnician(text, count, page).subscribe(result => {
      this.technicianList = result;
      this.tableList = new MatTableDataSource(this.technicianList);
    });
  }

  technicianFilter() {
    this.tableList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }

}
