import {Component, OnInit, ViewChild} from '@angular/core';
import {TechnicianDTO} from '../../dto/TechnicianDTO';
import {MatTableDataSource} from '@angular/material';
import {TechnicianService} from '../../service/technician.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {RxFormBuilder, FormGroupExtension} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  technicianDTO: TechnicianDTO = new TechnicianDTO();
  technicianList: Array<TechnicianDTO> = [];
  tableList: MatTableDataSource<any>;
  displayedColumns = ['name', 'number', 'rank', 'Trade', 'codependencyLevel', 'serviceNumber'];
  searchTXT: string;
  addTechnicianForm: FormGroup;

  constructor(
    private technicianService: TechnicianService,
    private formBuilder: FormBuilder,
  ) {
    this.getAllTechnician('', 0, 0);
  }

  ngOnInit() {
    this.addTechnicianForm = this.formBuilder.group({
        'name': [this.technicianDTO.name, [Validators.required]],
        'number': [this.technicianDTO.number, [Validators.required]],
        'rank': [this.technicianDTO.rank, [Validators.required]],
        'CL': [this.technicianDTO.compedencyLevel, [Validators.required]],
        'Trade': [this.technicianDTO.trade, [Validators.required]],
        'serviceNumber': [this.technicianDTO.serviceNumber, [Validators.required]],
      }
    );
  }

  addTechnician() {
    this.technicianDTO.isEnable = 1;
    this.technicianService.addTechnician(this.technicianDTO).subscribe(result => {
      if (result) {
        alert('Add Technician Success');
        this.getAllTechnician('', 0, 0);
        this.technicianDTO.name = null;
        this.technicianDTO.number = null;
        this.technicianDTO.serviceNumber = null;
        this.technicianDTO.trade = null;
        this.technicianDTO.rank = null;
        this.technicianDTO.compedencyLevel = null;
      } else {
        alert('Technician Added Fail');
      }
    });
  }

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
