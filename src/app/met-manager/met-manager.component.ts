import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-met-manager',
  templateUrl: './met-manager.component.html',
  styleUrls: ['./met-manager.component.scss']
})
export class MetManagerComponent implements OnInit {

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';  

  constructor() { }

  ngOnInit() {
  }

}
