import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {ToolInComponent} from '../tool-in/tool-in.component';
import {ToolComponent} from '../tool/tool.component';
import {ToolService} from '../../service/tool.service';
import {ToolDTO} from '../../dto/toolDTO';

@Component({
  selector: 'app-tool-add',
  templateUrl: './tool-add.component.html',
  styleUrls: ['./tool-add.component.css']
})
export class ToolAddComponent implements OnInit {

  toolDto: ToolDTO = new ToolDTO();
  toolList: Array<ToolDTO> = [];

  tableToolList: MatTableDataSource<any>;
  displayedColumns = ['Item_Name', 'Tool_Code', 'Description', 'Part_No', 'Category'];

  searchTXT: string;

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

  searchHistory() {
    this.tableToolList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }

}
