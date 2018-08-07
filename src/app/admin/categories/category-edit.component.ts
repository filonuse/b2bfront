import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./categories.css']
})
export class CategoryEditComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    console.log('hello world');
  }
}
