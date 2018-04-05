/**
 * Component for the main application pages. Has side/top (depending on size of window)
 * navigation links
 */
import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from '../internationalization-service/internationalization.service';
import { OrchidNetService } from '../orchid-net/orchid-net.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({'margin-bottom': '-280px'}), // 280px is a magic number that will need to change whenever we add or remove languages
        animate('200ms ease-in', style({ 'margin-bottom': '0px'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({'margin-bottom': '-280px'}))
      ])
    ])
  ]
})
export class MainNavigationComponent implements OnInit {

  connected: boolean = false;
  /** Set to true to open the list of languages */
  languageMenuOpened: boolean = false;
  LANGUAGES: Array<any>;
  selectedLanguage: object;

  constructor(private internationalization: InternationalizationService, private orchidNetService: OrchidNetService) {
    this.LANGUAGES = internationalization.LANGUAGES;
    this.selectedLanguage = internationalization.selectedLanguage;
  }

  ngOnInit() {
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
    this.languageMenuOpened = false;
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
