import { ChangeDetectorRef, Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { Chart } from "chart.js";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { status } from "../app.component";
import { ConfigService } from "../config-service/config.service";
import { BrowsingLocation } from "../classes/browsing-location";
import { OrchidNetService } from "../orchid-net/orchid-net.service";
import { WalletService } from "../wallet.service";


const CHART_OPTIONS = {
  scales: {
    xAxes: [{
      gridLines: {
        drawBorder: false,
        display: false,
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      }
    }]
  },
  legend: {
    display: false,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }
};

/**
 * Names of the tip states. Go through these in this order on first-run
 */
const TIP_STATES: string[]  = [
  'FUND_ACCOUNT_TIP',
  'BROWSING_LOCATION_TIP'
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("browseLocationInput") browseLocationInput: ElementRef;
  public connected: boolean = false;
  timer: NodeJS.Timer = null;
  public time_connected: number = 0;
  time: Date = new Date(0, 0, 0, 0, 0, 0, 0);
  selectedBrowsingLocation: BrowsingLocation;
  public earningsChart: Chart;
  /** Time span to show in the chart */
  public earningsSpan: string = '1w';

  public gbRemaining: number;

  public tip_state: string = TIP_STATES[0];

  /**
   * Model that typeahead binds to. Different from selectedBrowsingLocation because
   * typeahead doesn't provide us an easy way to tell when a user left the typeahead
   * without making a selection. If null, indicates that the typeahead is closed.
   */
  typeaheadBrowsingLocation: BrowsingLocation|string|boolean = false;
  typeaheadOpen: boolean = false;

  constructor(private _config: ConfigService, private changeDetector: ChangeDetectorRef, private orchidNetService: OrchidNetService, private renderer : Renderer2, private walletService: WalletService) {
    this.connected = false;
  }

  ngOnInit() {

    this.orchidNetService.connected.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });

    this.selectedBrowsingLocation = BrowsingLocation.getLocations().find(bl => {
      return bl.code == this._config.selectedBrowsingLocation;
    })

    this.gbRemaining = this.walletService.getGBRemaining();

    this.initializeChart()
  }

  startTimer() {
    this.connected = true;
    this.changeDetector.detectChanges();
    this.timer = setInterval(() => {
      this.time_connected += 1000;
      this.time = new Date(0, 0, 0, 0, 0, 0, this.time_connected);
      this.changeDetector.detectChanges();
    }, 1000);
  }

  stopTimer() {
    this.connected = false;
    this.changeDetector.detectChanges();
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }


  /**
   * Puts focus on the browse location input, and clears the input for input
   *
   * @return void
   */
  focusBrowseLocationInput() {
    // this.browseLocationInput.nativeElement.value = '';
    this.typeaheadBrowsingLocation = '';
    this.typeaheadOpen = true;
    setTimeout(() => {
      this.browseLocationInput.nativeElement.focus();
    });
  }

  /**
   * Called when the browse location input is blurred.
   */
  browseLocationInputBlured() {
    this.typeaheadOpen = false;
    console.log('blurred');
    this.typeaheadBrowsingLocation = null;
  }

  browseLocationSelected(evt) {
    this.selectedBrowsingLocation = evt.item;
    this.browseLocationInput.nativeElement.blur();
    // this.typeaheadBrowsingLocation = null;
  }

  browsingLocationInputFormatter(browsingLocation: BrowsingLocation) {
    return browsingLocation.name;
  }

  searchBrowsingLocations(searchText: Observable<string>) {

    return searchText.debounceTime(200)
      .distinctUntilChanged().map(t => {
        if (t.length < 3) {
          return [];
        }
        return BrowsingLocation.getLocations()
          .filter(bl => {
            return bl.name.toLowerCase().includes(t.toLowerCase());
          }).slice(0, 10);
      })
  }

  /**
   * Call when the user clicks "got it" on a tool tip
   * @param  tip_name one of TIP_STATES
   */
  tipConfirm(tip_name) {
    console.log("tipConfirm: " + tip_name);

    var next_tip_index = TIP_STATES.indexOf(tip_name);
    if (next_tip_index != -1) {
      this.tip_state = TIP_STATES[next_tip_index + 1];
    } else {
      this.tip_state = null;
    }
  }

  setSelectedBrowsingLocation(browsingLocation: BrowsingLocation) {
    this.selectedBrowsingLocation = browsingLocation;
    // this._config.selectedBrowsingLocation = browsingLocation.code;
    console.log("BrowsingLocation := ", browsingLocation);
    this.orchidNetService.setBrowsingLocation(browsingLocation);
  }

  browsingLocations(): BrowsingLocation[] {
    return BrowsingLocation.getLocations();
  }

  /**
   * Change the timespan shown in the earnings graph
   * @param  span the span to show
   */
  changeSpan(span) {
    this.earningsSpan = span;
  }

  initializeChart() {
    // mock data
    var earningsData = {
      labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      datasets: [{
        label: "ORCHID tokens Earned",
        data: [0, '5.9', '7.5', '2.0', '20', '5.5'],
        fill: true,
        borderColor: '#553591',
        pointBorderColor: '#553591',
        pointBorderWidth: '1',
        backgroundColor: '#f2eefa',
        pointBackgroundColor: '#fff',
        pointRadius: 6,
      }]
    };

    this.earningsChart = new Chart('dashboardEarningsChart', {
      type: 'line',
      data: earningsData,
      options: CHART_OPTIONS
    });
  }
}
