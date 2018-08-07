import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CategoriesService} from '../../services/admin-services/categories.service';
import {CATALOGS} from '../../models/catalogs.model';
import {GoodsService} from '../../services/clients-services/goods.service';
import {GoodsModel} from '../../models/goods.model';
import {language} from '../../authentication/auth.component';
import {LanguageService} from '../../services/language.service';

const columns = 2;

@Component({
  selector: 'app-goods-edit',
  templateUrl: './goods-edit.component.html',
  styleUrls: ['../goods.css']
})


export class GoodsEditComponent implements OnChanges {
  fields: Array<any> = [];
  categoriesList: Array<string> = [];
  blockList: any;
  goodsModel: GoodsModel;

  languageState: string;
  currentLanguage: any;

  @Input('inputData') inputData;
  @Input('editMode') editMode: boolean;
  @Output('finish') finish: EventEmitter<boolean> = new EventEmitter();

  constructor(private goodsService: GoodsService, private categories: CategoriesService, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    this.blockList = {
      start: 0,
      end: 0,
      perColumn: 0,
      total: 0,
      columns: []
    };
    categories.getCatalogs(CATALOGS.Categories.name).subscribe((response: any) => {
      this.categoriesList = response.data;
      this.blockList.total = response.data.length;
      this.blockList.columns.length = columns;
      this.blockList.end = this.blockList.perColumn = Math.ceil(this.blockList.total / this.blockList.columns.length);
      console.log(this.blockList);
    });
  }

  ngOnChanges(change) {
    console.log('syuda smotret', change);
    this.goodsModel = new GoodsModel();
    this.fields = [];
    if (change.inputData && change.inputData.currentValue && this.editMode) {
      this.goodsModel = Object.assign({}, change.inputData.currentValue);
      this.goodsModel.images.splice(this.goodsModel.images.length, 1);
      for (const field in this.goodsModel) {
        this.fields.push({name: field, type: (typeof this.goodsModel[field]).toString()});
      }
      console.log(this.goodsModel, this.fields);
    } else {
      this.goodsModel = new GoodsModel();
      for (const field in this.goodsModel) {
        this.fields.push({name: field, type: (typeof this.goodsModel[field]).toString()});
      }
    }
  }

  startPos(startPos, step, index) {
    if (index === 0) {
      return this.blockList.start;
    } else {
      return (startPos + (step * index));
    }
  }

  endPos(endPos, step, index) {
    if (index === 0) {
      return this.blockList.end;
    } else {
      return (endPos + (step * index));
    }
  }

  save(event) {
    console.log('model', this.goodsModel);
    this.goodsModel.images = event.images;
    this.goodsModel.to_delete_images = event.deletedImages;
    console.log('goods edit', event, this.goodsModel);
    this.editMode ? this.updateGoods() : this.createGoods();
  }

  updateGoods() {
    this.goodsService.update(this.goodsModel).subscribe(response => {
      console.log(response);
      this.finish.emit(true);
      this.goodsModel = new GoodsModel();
    });
  }

  createGoods() {
    this.goodsService.add(this.goodsModel).subscribe(() => {
      this.finish.emit(true);
      this.goodsModel = new GoodsModel();
    });
  }

  closeModal() {
    this.finish.emit(true);
  }


}
