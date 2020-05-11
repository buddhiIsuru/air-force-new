import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ToolService} from '../../service/tool.service';
import {CategoryDTO} from '../../dto/CategoryDTO';
import {ToolDTO} from '../../dto/toolDTO';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  @ViewChild('serviceForm') public serviceForm: NgForm;

  categoryList: Array<CategoryDTO> = [];
  toolDto: ToolDTO = new ToolDTO();

  constructor(
    private categoryService: CategoryService,
    private toolService: ToolService
  ) {
    this.loadAllCategory('', 0, 0);
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

  addItem() {
    console.log('Item Add');
    this.toolService.addTool(this.toolDto).subscribe(result => {
      if (result) {
        alert('Item Added Successful');
      }
    });
  }

}
