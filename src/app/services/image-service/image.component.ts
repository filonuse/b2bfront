import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.css']
})
export class ImageComponent implements OnChanges {
  @Input('inputData') inputData: any;
  @Input('editMode') editMode: boolean;
  @Output('readyForSave') save: EventEmitter<any> = new EventEmitter();
  @Output('closeForce') close: EventEmitter<boolean> = new EventEmitter();

  currentImages: Array<any> = [];
  newImages: Array<any> = [];
  imagesToDelete: Array<any> = [];
  reader: FileReader;
  maxCount = 8;

  constructor() {
    this.reader = new FileReader();
  }

  ngOnChanges(change) {
    this.resetData();
    change.inputData.currentValue.forEach(image => {
      this.currentImages.push(image);
    });
    this.editMode && this.currentImages ? this.currentImages.length += 1 : this.currentImages.length = 1;
  }

  addImages(index, event): void {
    const file = event.target.files[0];
    this.reader.readAsDataURL(file);
    this.reader.onload = (): void => {
      this.setTempImage(index);
      this.newImages.push(this.reader.result);
      event.target.value = null;
    };
    console.log(this.newImages);
  }

  setTempImage(index): void {
    this.currentImages[index] = this.reader.result;
    this.currentImages.length <= this.maxCount ? this.currentImages.push('') : console.log('limit');
  }

  removeImage(index, image): void {
    console.log(index, image, this.newImages);
    if (this.editMode && image.id) {
      this.imagesToDelete.push(image.id);
    }
    console.log(this.newImages, this.newImages.indexOf(image));
    this.newImages.splice(this.newImages.indexOf(image), 1);
    this.currentImages.splice(this.currentImages.indexOf(image), 1);
    console.log(this.newImages);
  }

  saveChanges() {
    this.currentImages.splice(this.currentImages.length - 1, 1);
    this.save.emit({images: this.newImages, deletedImages: this.imagesToDelete});
    this.resetData();
  }

  closeModal() {
    this.resetData();
    this.close.emit(true);
  }

  resetData(): void {
    this.currentImages = [];
    this.imagesToDelete = [];
    this.newImages = [];
  }

}
