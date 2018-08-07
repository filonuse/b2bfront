class SettingsUrlConfig {
  public get getAll() {
    return '/client/settings';
  }

  public update(id) {
    return '/client/settings/' + id;
  }
}

export const SETTINGS_API = new SettingsUrlConfig();
