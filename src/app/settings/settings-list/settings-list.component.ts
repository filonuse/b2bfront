import {Component} from '@angular/core';
import {SettingsService} from '../../services/clients-services/settings.service';
import {ResponseModel} from '../../models/response.model';
import {language, userRoles} from '../../authentication/auth.component';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['../settings.css']
})

export class SettingsListComponent {
  settingsList: Array<any>;
  currentRole: string;
  languageState: string;
  currentLanguage: any;

  constructor(private service: SettingsService, private languageService: LanguageService) {
    language.subscribe(value => {
      this.languageState = value ? value : 'ua';
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    userRoles.subscribe((response) => {
      this.currentRole = response ? response.data.role : localStorage.getItem('userRole');
    });
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((response: ResponseModel) => {
      console.log(response);
      this.settingsList = response.data;
    });
  }

  changeValue(setting) {
    setting.value === 'on' ? setting.value = 'off' : setting.value === 'off' ? setting.value = 'on' : '';
    this.service.update(setting).subscribe(() => {
      this.getAll();
    });
  }
}
