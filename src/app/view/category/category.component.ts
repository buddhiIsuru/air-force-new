import {Component, OnInit} from '@angular/core';
import {CategoryDTO} from '../../dto/CategoryDTO';
import {CategoryService} from '../../service/category.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  ctegoryDTO: CategoryDTO = new CategoryDTO();
  categoryList: Array<CategoryDTO> = [];
  tebeList: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'isEnable'];
  searchTXT: string;

  constructor(
    private ctegoryService: CategoryService,
  ) {
    this.getAllCategory('', 0, 0);
  }

  ngOnInit() {
  }

  addCategory() {
    this.ctegoryDTO.isEnable = 1;
    this.ctegoryService.addCategory(this.ctegoryDTO).subscribe(result => {
      if (result) {
        alert('Category Added Success');
      }
    });
  }

  getAllCategory(text: string, count: number, page: number) {
    this.ctegoryService.getAllCategory(text, count, page).subscribe(result => {
      this.categoryList = result;
      this.tebeList = new MatTableDataSource(this.categoryList);
      console.log(JSON.stringify(result));
    });
  }

  categoryFilter() {
    this.tebeList.filter = this.searchTXT.trim().toLocaleLowerCase();
  }

}
