import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-met-manager',
  templateUrl: './met-manager.component.html',
  styleUrls: ['./met-manager.component.scss']
})
export class MetManagerComponent implements OnInit {

  public earningsChartLabels:string[] = ['Jan', 'Feb', 'Mar','Apr','May','Jun'];
  public earningsChartData:number[] = [350, 450, 100, 88, 542, 588];
  public earningsChartType:string = 'line';


  constructor() { }

  ngOnInit() {
  var isDB = true;

  var earningsChart = document.getElementById("earningsChart");
  var valueChart = document.getElementById("valueChart");
  var gbValueChart = document.getElementById("gbValueChart");

  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.elements.line.tension = 0;
  Chart.defaults.global.elements.point.borderWidth = 3;
  var earningsData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "ORCHID tokens Earned",
      data: [0, '5.9', '7.5', '2.0', '20', '5.5'],
      fill: false,
      borderColor: '#18BECC',
      pointBorderColor: '#18BECC',
    pointBackgroundColor: '#fff',
    pointRadius: 4,
    }]
  };

  var valueData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "ORCHID tokens Value",
      data: ['33.45', '55.92', '127.50', '322.00', '790.67', '1236.05'],
      fill: false,
      borderColor: '#F5A623',
      pointBorderColor: '#F5A623',
    pointBackgroundColor: '#fff',
    pointRadius: 4,
    }]
  };

  var gbValueData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{
      label: "ORCHID tokens Value in GB",
      data: ['40', '33.5', '36.7', '28.5', '22', '24'],
      fill: false,
      borderColor: '#E068C4',
      pointBorderColor: '#E068C4',
    pointBackgroundColor: '#fff',
    pointRadius: 4,
    }]
  };
  var chartOptions = {
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

  var earningsLineChart = new Chart(earningsChart, {
    type: 'line',
    data: earningsData,
    options: chartOptions
  });
  var valueLineChart = new Chart(valueChart, {
    type: 'line',
    data: valueData,
    options: chartOptions
  });
  var gbValueLineChart = new Chart(gbValueChart, {
    type: 'line',
    data: gbValueData,
    options: chartOptions
  });

  }

}
