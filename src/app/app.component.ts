import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateService } from '@ngx-translate/core';

var app = (<any>window).require('electron').remote.app;

/**
 * Keys used for values stored in localStorage
 */
const LOCAL_STORAGE_KEYS = {
  LANGUAGE: 'LANGUAGE'
};

/**
 * The available languages
 */
const LANGUAGES: Array<any> = [
  { code: 'en', native: 'English' },
  { code: 'zh', native: '中国' },
  { code: 'ar', native: 'العربية' },
  { code: 'ru', native: 'русский' },
  { code: 'es', native: 'Español' },
  { code: 'de', native: 'Deutsche' },
  { code: 'ja', native: 'Japanese' },
  { code: 'hi', native: 'Hindi' }
];

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // what is this for?
  title: string = 'app';
  connected: boolean = false;
  // English, Chinese, Arabic, Russian, Spanish, German, Japanese, Hindi

  LANGUAGES = LANGUAGES;
  selectedLanguage = LANGUAGES[0];

  constructor(private translate: TranslateService) {
    this.translate = translate;

    // language stuff;  ///////////////////////////////////////////////////////
    // TODO: at some point this probably will belong in its own module
    let languageKeys = LANGUAGES.map(o => o.code)
    translate.addLangs(languageKeys);
    translate.setDefaultLang('en');

    let languageCode = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
    if (languageCode === null) {
      let browserLang = translate.getBrowserLang();
      languageCode = languageKeys.indexOf(browserLang) !== -1 ? browserLang : 'en';
    }

    this.useLanguage(languageCode);
    // end language stuff /////////////////////////////////////////////////////

  }

  private languageObjectForCode(languageCode) {
    return LANGUAGES.find(l => l.code === languageCode);
  }

  /**
   * Use the language indicated by languageCode
   * @param  languageCode The language code; one of LANGUAGES
   * @return {void}
   */
  private useLanguage(languageCode) {
    this.selectedLanguage = this.languageObjectForCode(languageCode);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, languageCode);
    this.translate.use(languageCode);
  }

  /**
   * Called when a language is selected from the drop-down menu
   *
   * @return {void}
   */
  languageSelected(languageCode) {
    this.useLanguage(languageCode);
  }

  getOnOffTranslationKey(): string {
    return this.connected ? 'STATUSES.ON' : 'STATUSES.OFF';
  }

  /**
   * Toggle the service on or off
   *
   * @return {void}
   */
  toggleOnOff() {
    console.log("Value of connected: ", this.connected);
    this.connected = !this.connected;
    console.log("Value of connected now: ", this.connected);

    if (this.connected) {
      app.chrome_vars.startChrome();
    } else
      app.chrome_vars.stopChrome();
  }
}

var status = { connected: false };
export { status };
