import { Component, OnInit } from '@angular/core';
import {CategoryDTO} from '../../../dto/CategoryDTO';
import {ToolDTO} from '../../../dto/toolDTO';
import {MatTableDataSource} from '@angular/material';
import {CategoryService} from '../../../service/category.service';
import {ToolService} from '../../../service/tool.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent implements OnInit {


  categoryList: Array<CategoryDTO> = [];
  toolDto: ToolDTO = new ToolDTO();
  toolList: Array<ToolDTO> = [];
  tableToolList: MatTableDataSource<any>;
  displayedColumns = ['Item_Name', 'Tool_Code', 'Description', 'Part_No'];

  searchTXT: string;

  constructor(
    private categoryService: CategoryService,
    private toolService: ToolService
  ) {
    this.loadAllCategory('', 0, 0);
    this.loadAllItem('', 0, 0);
  }

  ngOnInit() {
  }

  loadAllCategory(text: string, count: number, page: number) {
    console.log('---- All Category ----');
    this.categoryService.getAllCategory(text, count, page).subscribe(result => {
      this.categoryList = result;
      console.log('All Category :' + JSON.stringify(result));
    });
  }

  clickCategory() {
    console.log('********** Click Category ***** ');
    console.log('Tool Part  No :- ' + this.toolDto.partNO);
    console.log('Tool Description :- ' + this.toolDto.description);
    console.log('Tool Name :- ' + this.toolDto.name);
    console.log('Tool Code :- ' + this.toolDto.toolCode);
  }

  // addItem() {
  //   console.log('Item Add');
  //   this.toolDto.status = 'AVAILABLE';
  //   this.toolService.addTool(this.toolDto).subscribe(result => {
  //     if (result) {
  //       alert('Item Added Successful');
  //       this.loadAllItem('', 0, 0);
  //     } else {
  //       alert('Item Added Fail');
  //     }
  //   });
  // }

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
