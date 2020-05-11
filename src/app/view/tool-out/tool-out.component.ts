import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ToolDTO} from '../../dto/toolDTO';
import {DepartmentDTO} from '../../dto/DepartmentDTO';
import {ToolService} from '../../service/tool.service';
import {DepatmentService} from '../../service/depatment.service';
import {TechnicianService} from '../../service/technician.service';
import {ReservationService} from '../../service/reservation.service';
import {TechnicianDTO} from '../../dto/TechnicianDTO';
import {ReserverDetailDTO} from '../../dto/ReserverDetailDTO';
import {ReserveDTO} from '../../dto/ReserveDTO';
import {DatePipe} from '@angular/common';
import {MatPaginator, MatSelect, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, NgForm, Validator, Validators} from '@angular/forms';
import {Tooloutmodule} from './tooloutmodule';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BarecodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Toolsearchmodule} from './toolsearchmodule';

@Component({
  selector: 'app-tool-out',
  templateUrl: './tool-out.component.html',
  styleUrls: ['./tool-out.component.css']
})
export class ToolOutComponent implements OnInit {

  myControl = new FormControl();
  toolList: Array<ToolDTO> = [];
  filteredOptions: Observable<ToolDTO[]>;
  @ViewChild('toolsearch') public toolsearchs: NgForm;
  @ViewChild('tooladddb') public tooladddbform: NgForm;
  tooladddb;

  dataSource = new MatTableDataSource<ToolDTO>(this.toolList);
  displayedColoumns: string[] = ['position', 'name', 'weight', 'symbol', 'columndelete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  toolOut: Tooloutmodule = new Tooloutmodule();
  toolSearch: Toolsearchmodule = new Toolsearchmodule();
  toolDto: ToolDTO = new ToolDTO();
  departmentDto: DepartmentDTO = new DepartmentDTO();
  technicianDto: TechnicianDTO = new TechnicianDTO();
  reservationDetailDto: ReserverDetailDTO = new ReserverDetailDTO();
  reservationDto: ReserveDTO = new ReserveDTO();


  departmentList: Array<DepartmentDTO> = [];
  reservationDetailList: Array<ReserverDetailDTO> = [];
  tableReservatinDetailList: MatTableDataSource<any>;
  displayedColumns = ['Item', 'Item_Name', 'Remark', 'Issue_date', 'Issue_time', 'location', 'action'];

  techNameTXT: string;
  departmentId: number;
  techRankTXT: string;
  techIdTXT: number;
  remarkTXT: string;
  itemIdTXT: number;
  itemNameTXT: string;
  bankCtrl: string;
  remarkTXTMain: string;
  hODateTXT: any;
  issueDateTXT: any;
  toolsearch: FormGroup;
  // tooladddb: FormGroup;
  toolIdTxt: number;
  techName: string;
  techRank: string;
  techNumber: string;
  techTrade: string;
  techCL: string;
  techServiceNo: string;

  // barcode reader

  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;

  barcodeValue;

  constructor(
    private toolservice: ToolService,
    private departmentService: DepatmentService,
    private technicianService: TechnicianService,
    private reservationService: ReservationService,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
  ) {
  }

  public filteredTools: ReplaySubject<ToolDTO[]> = new ReplaySubject<ToolDTO[]>(1);

  public filteredToolsMulti: ReplaySubject<ToolDTO[]> = new ReplaySubject<ToolDTO[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
  @ViewChild('multiSelect') multiSelect: MatSelect;

  private _onDestroy = new Subject<void>();

  ngOnInit() {

    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.toolsearch = this.formBuilder.group({
      // 'tool': [this.]
      'name': [this.toolOut.remark, [
        Validators.required,
        Validators.minLength(3)
      ]],
      'itemName': [this.toolOut.toolName, [Validators.required]],
      // 'location': [this.toolSearch.location, [Validators.required]]
    });

    this.tooladddb = this.formBuilder.group({
      'handOverDate': [this.toolOut.hod, [
        Validators.required,
      ]],
      'rem': [this.toolOut.remarkM, [
        Validators.required,
      ]],
      'tech': [this.toolOut.techId, [
        Validators.required,
      ]]
    });

    this.loadAllDepartment('', 0, 0);
    this.loadAllTool('', 0, 0);


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        // map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.toolList.slice())
      );
  }

  delete(id) {
    console.log(+'elm');
    console.log(JSON.stringify(this.reservationDetailList) + 'data');

    for (let index = 0; index < this.reservationDetailList.length; index++) {
      console.log(this.reservationDetailList[index].itemID + 'index');
      if (this.reservationDetailList[index].itemID === id) {
        this.reservationDetailList.splice(index, 1);

      }

    }
    this.tableReservatinDetailList = new MatTableDataSource(this.reservationDetailList);

  }

  displayFn(tool?: ToolDTO): string | undefined {
    return tool ? tool.name : undefined;
  }

  private _filter(name: string): ToolDTO[] {
    const filterValue = name.toLowerCase();

    return this.toolList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  loadAllDepartment(text: string, count: number, page: number) {
    this.departmentService.getAllDepartment(text, count, page).subscribe(depatment => {
      this.departmentList = depatment;
      console.log('Department : ' + JSON.stringify(depatment));
    });
  }

  loadAllTool(text: string, count: number, page: number) {
    this.toolservice.getAllTool(text, count, page).subscribe(tool => {
      this.toolList = tool;
      console.log('Tool : ' + JSON.stringify(tool));
    });
  }

  searchTechnician(id: number) {
    console.log('Search Technician ID : ' + id);
    this.technicianService.searchTechnicianid(id).subscribe(tech => {
      console.log('Search Technician Result : ' + JSON.stringify(tech));
      if (tech) {
        this.techName = tech.name;
        this.techRank = tech.rank;
        this.techNumber = tech.number;
        this.techTrade = tech.trade;
        this.techCL = tech.compedencyLevel;
        this.techServiceNo = tech.serviceNumber;
      } else {
        alert('Not Technician');
      }

    });
  }


  addTable() {

    console.log('---addArrayListData---');


    if (this.reservationDetailList.length > 0) {
      let j = 0;
      for (let i = 0; i < this.reservationDetailList.length; i++) {
        if (this.reservationDetailList[i].itemID === this.itemIdTXT) {
          j++;
          alert('Item Is All Ready have');
          this.toolsearchs.form.reset();
        }
      }
      if (j === 0) {
        // alert('Value J in : ' + j);
        this.reservationDetailDto.itemID = this.itemIdTXT;
        this.reservationDetailDto.itemName = this.itemNameTXT;
        this.reservationDetailDto.departmentId = this.departmentId;

        for (let i = 0; i < this.departmentList.length; i++) {
          if (this.departmentList[i].id === this.departmentId) {
            this.reservationDetailDto.locationName = this.departmentList[i].location;
          }
        }

        this.reservationDetailDto.remark = 'Remark';
        this.reservationDetailDto.status = 'Granted';
        this.reservationDetailDto.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        this.reservationDetailDto.issueTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
        this.reservationDetailDto.handOverTime = '00:00:00';

        console.log('Array Data :- ' + JSON.stringify(this.reservationDetailDto));

        this.reservationDetailList.push(this.reservationDetailDto);
        this.tableReservatinDetailList = new MatTableDataSource(this.reservationDetailList);
        this.reservationDetailDto = new ReserverDetailDTO();
        this.toolsearchs.form.reset();

        console.log('Array List Data  :- ' + JSON.stringify(this.reservationDetailList));
      }
    } else {
      this.reservationDetailDto.itemID = this.itemIdTXT;
      this.reservationDetailDto.itemName = this.itemNameTXT;
      this.reservationDetailDto.departmentId = this.departmentId;

      for (let i = 0; i < this.departmentList.length; i++) {
        if (this.departmentList[i].id === this.departmentId) {
          this.reservationDetailDto.locationName = this.departmentList[i].location;
        }
      }

      this.reservationDetailDto.remark = 'Remark';
      this.reservationDetailDto.status = 'Granted';
      this.reservationDetailDto.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      this.reservationDetailDto.issueTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
      this.reservationDetailDto.handOverTime = '00:00:00';

      console.log('Array Data :- ' + JSON.stringify(this.reservationDetailDto));
      this.reservationDetailList.push(this.reservationDetailDto);
      this.tableReservatinDetailList = new MatTableDataSource(this.reservationDetailList);
      this.reservationDetailDto = new ReserverDetailDTO();
      this.toolsearchs.form.reset();

      console.log('Array List Data  :- ' + JSON.stringify(this.reservationDetailList));
    }
  }

  dataDropTable() {
    console.log('{}{}{}{');
    this.reservationDetailList.splice(1);
  }

  focus() {
    console.log('');
  }


  checkArryLength() {
    if (0 === this.reservationDetailList.length) {
      alert('Not Tool Added');
    } else {
      this.submitIssueTool();
    }
  }

  submitIssueTool() {

    // this.hODateTXT = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    // this.issueDateTXT= this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    const currentUser = JSON.parse(sessionStorage.getItem('token'));

    this.reservationDto.technicianId = this.techIdTXT;
    this.reservationDto.departmentId = 1;
    this.reservationDto.remark = 'remark';
    this.reservationDto.status = 'RECEIVE';
    this.reservationDto.userId = currentUser.id;
    this.reservationDto.issueTime = this.datepipe.transform(new Date(), 'hh:mm:ss');
    this.reservationDto.issueDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.reservationDto.handOverTime = '12:00:00';
    this.reservationDto.reserveDetailsDTOS = this.reservationDetailList;
    console.log('submitIssueTool ---------' + JSON.stringify(this.reservationDto));
    this.reservationService.issueReservation(this.reservationDto).subscribe(result => {
      if (result) {
        alert('Reservation Success');
        this.tooladddbform.form.reset();
        this.dataSource = new MatTableDataSource();
      } else {
        alert('Reservation Added Fail');
      }
    });
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
  }

  chengeValusTXT(id: number) {
    if (id !== null) {
      this.toolservice.getItemById(id).subscribe(result => {
        const status = result.status;
        const name = result.name;
        if (result) {
          if (status === 'AVAILABLE') {
            this.itemNameTXT = name;
          } else {
            alert('This Item has Bean Receive');
            this.toolsearchs.form.reset();
          }
        } else {
          alert('Item not Found');
        }
      });
    } else {
    }

  }

}
