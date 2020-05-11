import {Component, OnInit} from '@angular/core';
import {ToolDTO} from '../../dto/toolDTO';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ToolService} from '../../service/tool.service';
import {ToolComponent} from '../tool/tool.component';

class StatusType {
}

@Component({
  selector: 'app-tool-available',
  templateUrl: './tool-available.component.html',
  styleUrls: ['./tool-available.component.css']
})
export class ToolAvailableComponent implements OnInit {

  toolDto: ToolDTO = new ToolDTO();
  toolList: Array<ToolDTO> = [];
  statusType: string;
  searchTXT: string;

  tableToolList: MatTableDataSource<any>;
  displayedColumns = ['Item_Name', 'Tool_Code', 'Description', 'Part_No' , 'Status'];

  constructor(
    private dialog: MatDialog,
    private toolService: ToolService,
  ) {
    this.loadAllItem('', 0, 0);
  }

  ngOnInit() {
  }

  onCreate() {
    this.dialog.open(ToolComponent);
  }

  loadAllItem(text: string, count: number, page: number) {
    this.toolService.getAllTool(text, count, page).subscribe(result => {
      this.toolList = result;
      console.log('================' + JSON.stringify(result));
      this.tableToolList = new MatTableDataSource(this.toolList);
    });
  }

  setStatusType() {
    // alert('Set Status Type ' + this.statusType);
    if ('Available' === this.statusType) {
      this.toolService.getAll('AVAILABLE').subscribe(result => {
        this.toolList = result;
        console.log('================' + JSON.stringify(result));
        this.tableToolList = new MatTableDataSource(this.toolList);
      });
    } else {
      this.loadAllItem('', 0, 0);
    }
  }

  searchTransaction() {
    this.tableToolList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }


}
