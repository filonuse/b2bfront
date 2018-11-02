import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../services/item.service';
import {PostModel} from '../../models/auth.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.css']
})

export class ItemEditComponent implements OnInit {
  public currentItem: any;

  constructor(private activeRoute: ActivatedRoute, private itemService: ItemService, private router: Router) {
  }

  ngOnInit() {
    this.currentItem = {
      id: this.activeRoute.snapshot.params.id,
      type: this.activeRoute.snapshot.params.type
    };
    this.currentItem.id !== '0' ? this.getById() : this.currentItem = Object.assign(this.currentItem, new PostModel());
  }

  public getById(): void {
    this.itemService.getById(this.currentItem).subscribe((response: any) => {
      this.currentItem = Object.assign(this.currentItem, response);
      console.log(this.currentItem)
    });
  }

  public getBack(): void {
    this.router.navigate(['dashboard', {type: this.currentItem.type}]).catch();
  }

  public uploadChanges(): void {
    if (this.currentItem.id === 0) {
      this.itemService.add(this.currentItem).subscribe(() => {
        this.getBack();
      });
    } else {
      this.itemService.edit(this.currentItem).subscribe(() => {
        this.getBack();
      });
    }
  }
}
