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
        borderDash: [10,5]
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

  /**
   * Model that typeahead binds to. Different from selectedBrowsingLocation because
   * typeahead doesn't provide us an easy way to tell when a user left the typeahead
   * without making a selection. If null, indicates that the typeahead is closed.
   */
  typeaheadBrowsingLocation: BrowsingLocation|string|boolean = false;
  typeaheadOpen: boolean = false;

  constructor(private _config: ConfigService, private changeDetector: ChangeDetectorRef, private orchidNetService: OrchidNetService, private renderer : Renderer2) {
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

  setSelectedBrowsingLocation(browsingLocation: BrowsingLocation) {
    this.selectedBrowsingLocation = browsingLocation;
    // this._config.selectedBrowsingLocation = browsingLocation.code;
    console.log("BrowsingLocation := ", browsingLocation);
    this.orchidNetService.setBrowsingLocation(browsingLocation);
  }

  browsingLocations(): BrowsingLocation[] {
    return BrowsingLocation.getLocations();
  }

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
