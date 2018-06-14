import { ChangeDetectorRef, Component, ElementRef, NgModule, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { Chart } from "chart.js";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
        // display: false
        display: true
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 10
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
  },
  maintainAspectRatio: false
};

/**
 * Names of the tip states. Go through these in this order on first-run
 */
const TIP_STATES: string[]  = [
  'FUND_ACCOUNT_TIP',
  'BROWSING_LOCATION_TIP'
];

const FIRST_RUN_STEP_LOCALSTORAGE_KEY = 'DASHBOARD_FIRST_RUN_STEP';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild("browseLocationInput") browseLocationInput: ElementRef;
  public connected: boolean = false;
  timer: NodeJS.Timer = null;
  public time_connected: number = 0;
  time: Date = new Date(0, 0, 0, 0, 0, 0, 0);
  selectedBrowsingLocation: BrowsingLocation;
  public earningsChart: Chart;
  public bandwidthUsedChart: Chart;
  /** Time span to show in the chart */
  public earningsSpan: string = '1y';
  public bandwidthUsedSpan: string = '1y';

  public octEarned: number = 0;
  public bandwidthUsed: number = 0;

  public gbRemaining: number;
  public tip_state: string = null;

  public connectedSubscription: Subscription;

  /**
   * Model that typeahead binds to. Different from selectedBrowsingLocation because
   * typeahead doesn't provide us an easy way to tell when a user left the typeahead
   * without making a selection. If null, indicates that the typeahead is closed.
   */
  typeaheadBrowsingLocation: BrowsingLocation|string|boolean = false;
  typeaheadOpen: boolean = false;

  constructor(private _config: ConfigService, private changeDetector: ChangeDetectorRef, private orchidNetService: OrchidNetService, private renderer : Renderer2, private walletService: WalletService) {
    this.connected = false;
    this.selectedBrowsingLocation = BrowsingLocation.getLocations().find(bl => {
      return bl.code == this._config.selectedBrowsingLocation;
    })
    if (!this.selectedBrowsingLocation) {
      this.selectedBrowsingLocation = BrowsingLocation.getLocations()[0];
    }
  }

  ngOnInit() {
    // Check the first run state
    var firstRunStep: string = window.localStorage.getItem(FIRST_RUN_STEP_LOCALSTORAGE_KEY);
    if (!firstRunStep) {
      window.localStorage.setItem(FIRST_RUN_STEP_LOCALSTORAGE_KEY, '0');
      this.tip_state = TIP_STATES[0];
    } else if (firstRunStep === 'DONE') {
      // do nothing
    } else {
      let firstRunStepIdx: number = Number(firstRunStep);
      this.tip_state = TIP_STATES[firstRunStepIdx];
    }

    this.connectedSubscription = this.orchidNetService.connectedObservable.subscribe((isConnected: boolean) => {
      if (isConnected) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });

    this.gbRemaining = this.walletService.getGBRemaining();

    this.initializeChart()

    // This needs to be last
    if (this.orchidNetService.isConnected) {
        this.startTimer();
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.connectedSubscription.unsubscribe();
    this.changeDetector.detach();
  }

  startTimer() {
    this.connected = true;
    this.changeDetector.detectChanges();
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      this.time_connected = Date.now() - this.orchidNetService.connectionStartTime;
      this.time = new Date(0, 0, 0, 0, 0, 0, this.time_connected);
      this.changeDetector.detectChanges();
    }, 1000);
  }

  stopTimer() {
    this.connected = false;
    this.time_connected = 0;
    this.time = new Date(0, 0, 0, 0, 0, 0, 0);
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
    var next_tip_index: number = TIP_STATES.indexOf(tip_name) + 1;
    if (next_tip_index > (TIP_STATES.length - 1)) {
      this.tip_state = null;
      window.localStorage.setItem(FIRST_RUN_STEP_LOCALSTORAGE_KEY, 'DONE');
    } else {
      this.tip_state = TIP_STATES[next_tip_index];
      window.localStorage.setItem(FIRST_RUN_STEP_LOCALSTORAGE_KEY, String(next_tip_index));
    }
  }

  setSelectedBrowsingLocation(browsingLocation: BrowsingLocation) {
    this.selectedBrowsingLocation = browsingLocation;
    this._config.selectedBrowsingLocation = browsingLocation.code;
    this.orchidNetService.setBrowsingLocation(browsingLocation);
  }

  browsingLocations(): BrowsingLocation[] {
    return BrowsingLocation.getLocations().filter((bl) => {
      return['US', 'CA', 'DE', 'JP', 'AU', 'MX'].includes(bl.code);
    });
  }

  /**
   * Change the timespan shown in the earnings graph
   * @param  span the span to show
   */
  changeEarningsSpan(span : string) {
    this.earningsSpan = span;
  }

  changeBandwidthUsedSpan(span : string) {
    this.bandwidthUsedSpan = span;
  }

  /**
   * easter egg function to reset the settings.
   * click on the "OCT" after "Total Earnings" to call
   */
  resetSettings() {
    console.log('settings reset');
    window.localStorage.clear();
  }

  initializeChart() {
    // mock data
    var earningsData = {
      // TODO: internationalize
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: "ORCHID tokens Earned",
        data: (Array(12).fill(0)), // TODO: use real data
        fill: true,
        borderColor: '#553591',
        pointBorderColor: '#553591',
        pointBorderWidth: '1',
        backgroundColor: '#f2eefa',
        pointBackgroundColor: '#fff',
        pointRadius: 6,
      }]
    };

    var bandwidthUsedData = {
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: "Bandwidth used",
        data: (Array(12).fill(0)), // TODO: use real data
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
      type: 'bar',
      data: earningsData,
      options: CHART_OPTIONS
    });

    this.earningsChart = new Chart('bandwidthUsedChart', {
      type: 'bar',
      data: bandwidthUsedData,
      options: CHART_OPTIONS
    });
  }
}
