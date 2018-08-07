import {Component} from '@angular/core';
import {StoreService} from '../../services/clients-services/store.service';
import {ResponseModel} from '../../models/response.model';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Subject} from 'rxjs/Subject';
import {AddressService} from '../../services/address.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['stores.css']
})

export class StoresComponent {
  storesList: Array<any>;
  newStore: any;
  inputField: string;
  autocomplete: Subject<any> = new Subject<any>();
  responseList: Array<any>;
  loading: boolean;

  constructor(private storeService: StoreService, private modal: NgxSmartModalService, private addressService: AddressService) {
    this.inputField = '';
    this.loading = false;
    this.newStore = {
      name: '',
      legal_data: '',
      address: {
        address: '',
        lat: 0,
        lng: 0,
        place_id: ''
      }
    };
    this.storesList = [];
    this.responseList = [];
    this.getAll();
    this.autocomplete.debounceTime(1000).subscribe(response => {
      this.startSearch(response);
    });
  }

  getAll() {
    this.storeService.getAll().subscribe((response: ResponseModel) => {
      console.log(response);
      this.storesList = response.data;
    });
  }

  addStore() {
    this.modal.getModal('addEditModal').open();
  }

  autoCompleteFunc() {
    this.autocomplete.next(this.inputField);
  }

  startSearch(searchString) {
    this.addressService.autocomplete(searchString).subscribe((response: any) => {
      console.log(response);
      response.status === 'OK' ? this.responseList = response.predictions : this.responseList = [];
    });
  }

  getPlaceId(place) {
    this.inputField = place.description;
    this.responseList = [];
    this.loading = true;
    this.addressService.getCoords(place.place_id).subscribe((response: any) => {
      console.log(response);
      this.newStore.address.lat = response.result.geometry.location.lat;
      this.newStore.address.lng = response.result.geometry.location.lng;
      this.newStore.address.place_id = response.result.place_id;
      this.newStore.address.address = response.result.formatted_address;
      this.loading = false;
    });
  }

  saveStore() {
    this.loading = true;
    this.storeService.addStore(this.newStore).subscribe((response) => {
      console.log(response);
      this.loading = false;
      this.modal.getModal('addEditModal').close();
      this.getAll();
    });
  }
}
