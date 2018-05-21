/**
 * Component for the main application pages. Has side/top (depending on size of window)
 * navigation links
 */
import { AfterContentInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { InternationalizationService } from '../internationalization-service/internationalization.service';
import { OrchidNetService } from '../orchid-net/orchid-net.service';
import { WalletService } from "../wallet.service";
import { trigger, transition, animate, style } from '@angular/animations'
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

// magic number; will have to be changed if the number of languages changes
const LANGUAGE_LIST_HEIGHT = "280px";
const LANGUAGE_LIST_TRANSITION = "200ms ease-in";

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  animations: [
    trigger('languageSlideOpen', [
      transition(':enter', [
        style({
           'height': '0px',
           'overflow': 'hidden'
         }),
        animate(LANGUAGE_LIST_TRANSITION, style({ 'height': LANGUAGE_LIST_HEIGHT}))
      ]),
      transition(':leave', [
        style({
           'height': LANGUAGE_LIST_HEIGHT,
           'overflow': 'hidden'
         }),
        animate(LANGUAGE_LIST_TRANSITION, style({'height': '0px'}))
      ])
    ]),

  ]
})
export class MainNavigationComponent implements OnInit {

  connected: boolean = false;
  /** Set to true to open the list of languages */
  languageMenuOpened: boolean = false;
  LANGUAGES: Array<any>;
  selectedLanguage: object;
  @ViewChild('noticeModal') noticeModal: TemplateRef<any>;

  octBalanceSubject: BehaviorSubject<number>;

  constructor(private internationalization: InternationalizationService, private orchidNetService: OrchidNetService, private walletService: WalletService, private modalService: NgbModal) {
    this.LANGUAGES = internationalization.LANGUAGES;
    this.selectedLanguage = internationalization.selectedLanguage;
  }

  ngOnInit() {
    this.connected = this.orchidNetService.isConnected;
    this.octBalanceSubject = this.walletService.octBalanceBehaviorSubject;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (window.innerWidth > 400) {
        this.modalService.open(this.noticeModal, { centered: true, size: 'lg' });
      }
    }, 1)
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
    // Don't let the user connect if she has no ORCs
    if ( !(this.walletService.getOctBalance() > 0) && !this.connected) {
      return;
    }

    this.connected = !this.connected;

    if (this.connected) {
      this.orchidNetService.startNetwork();
    } else
      this.orchidNetService.stopNetwork();
  }
}
