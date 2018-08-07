class LanguageUrlConfig {
  getLanguage(locale) {
    return '/lang/' + locale;
  }
}

export const LANGUAGE_API = new LanguageUrlConfig();
