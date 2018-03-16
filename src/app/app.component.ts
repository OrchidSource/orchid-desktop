import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InternationalizationService } from './internationalization-service/internationalization.service';
import { OrchidNetService } from './orchid-net/orchid-net.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // what is this for?
  title: string = 'app';
  connected: boolean = false;
  LANGUAGES: Array<any>;
  selectedLanguage: object;

  constructor(private internationalization: InternationalizationService, private orchidNetService: OrchidNetService) {
    this.LANGUAGES = internationalization.LANGUAGES;
    this.selectedLanguage = internationalization.selectedLanguage;
  }

  /**
   * Use the language indicated by languageCode
   * @param  languageCode The language code; one of LANGUAGES
   * @return {void}
   */
  private useLanguage(languageCode) {
    this.internationalization.useLanguage(languageCode);
    this.selectedLanguage = this.internationalization.selectedLanguage;
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
    return this.connected ? 'STATUSES.CONNECTED' : 'STATUSES.DISCONNECTED';
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
      this.orchidNetService.startChrome();
    } else
      this.orchidNetService.stopChrome();
  }
}

var status = { connected: false };
export { status };
