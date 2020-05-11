import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryDTO} from '../../dto/CategoryDTO';
import {ToolDTO} from '../../dto/toolDTO';
import {CategoryService} from '../../service/category.service';
import {ToolService} from '../../service/tool.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ToolComponent} from '../tool/tool.component';

@Component({
  selector: 'app-tool-history',
  templateUrl: './tool-history.component.html',
  styleUrls: ['./tool-history.component.css']
})
export class ToolHistoryComponent implements OnInit {

  toolDto: ToolDTO = new ToolDTO();
  toolList: Array<ToolDTO> = [];

  searchTXT: string;

  tableToolList: MatTableDataSource<any>;
  displayedColumns = ['Item_Name', 'Tool_Code', 'Description', 'Part_No', 'Category'];

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
