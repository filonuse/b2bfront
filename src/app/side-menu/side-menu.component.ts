import {Component, OnDestroy} from '@angular/core';
import {language, userRoles} from '../authentication/auth.component';
import {LanguageService} from '../services/language.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.css']
})
export class SideMenuComponent implements OnDestroy {
  currentRole: string;
  languageState: string;
  currentLanguage: any;

  constructor(private languageService: LanguageService) {
    userRoles.subscribe((response) => {
      this.currentRole = response ? response.data.role : localStorage.getItem('userRole');
    });
    language.subscribe(value => {
      this.languageState = value;
      this.languageService.getLanguage(this.languageState).subscribe(response => this.currentLanguage = response);
    });
    // this.currentRole = localStorage.getItem('userRole');
  }

  ngOnDestroy() {
  }
}
