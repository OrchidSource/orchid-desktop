import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeysService } from '../local-storage-keys.service';

@Injectable()
export class InternationalizationService {

  /**
  * The available languages
  */
  LANGUAGES: Array<any> = [
    { code: 'en', native: 'English' },
    { code: 'zh', native: '中国' },
    { code: 'ar', native: 'العربية' },
    { code: 'ru', native: 'русский' },
    { code: 'es', native: 'Español' },
    { code: 'de', native: 'Deutsche' },
    { code: 'ja', native: 'Japanese' },
    { code: 'hi', native: 'Hindi' }
  ];

  selectedLanguage = this.LANGUAGES[0];

  constructor(private translate: TranslateService) {
    this.initialize();
  }

  initialize() {
    let languageKeys = this.LANGUAGES.map(o => o.code)
    this.translate.addLangs(languageKeys);
    this.translate.setDefaultLang('en');

    let languageCode = localStorage.getItem(LocalStorageKeysService.LANGUAGE);
    if (languageCode === null) {
      let browserLang = this.translate.getBrowserLang();
      languageCode = languageKeys.indexOf(browserLang) !== -1 ? browserLang : 'en';
    }

    this.useLanguage(languageCode);

  }

  /**
   * Switch to the language indicated by the language code, and save the language
   * in preferences

   * @param  languageCode On of the codes in LANGUAGES
   * @return {undefined}
   */
  useLanguage(languageCode: string) {
    var languageObject = this.languageObjectForCode(languageCode);
    if (!languageObject) {
      throw `Unsupported language: "${languageCode}"`;
    }

    this.selectedLanguage = languageObject;
    localStorage.setItem(LocalStorageKeysService.LANGUAGE, languageCode);
    this.translate.use(languageCode);
  }

  private languageObjectForCode(languageCode) {
    return this.LANGUAGES.find(l => l.code === languageCode);
  }

}
