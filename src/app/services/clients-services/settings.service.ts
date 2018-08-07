import {Injectable} from '@angular/core';
import {SETTINGS_API} from '../../config/api.url/settings.url.config';
import {HttpManagerService} from '../http-manager.service';

@Injectable()

export class SettingsService {
  constructor(private httpManager: HttpManagerService) {
  }

  public getAll() {
    return this.httpManager.getRequest(SETTINGS_API.getAll);
  }

  public update(settingModel) {
    return this.httpManager.putRequest(SETTINGS_API.update(settingModel.id), settingModel);
  }
}
