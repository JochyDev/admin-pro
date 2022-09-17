import { Component, Input, OnInit,  } from '@angular/core';

import { ChartData } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {
  
  @Input() title: string = 'Sin título'
  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3']
  @Input('data') data: any[] = [35, 25, 20]
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],  
  };

  ngOnInit(): void {
    this.doughnutChartData.labels = this.doughnutChartLabels;
    this.doughnutChartData.datasets.push({
      data: this.data,
      backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      hoverBackgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      hoverBorderColor: ['#6857E6', '#009FEE', '#F02059']
    });
  }

}
