
import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../../services/retrieveData/retrieve-data.service';
import { ZipcodeLocationViewModel } from '../../models/zipCodeLocationView.model'; 
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class PieChartComponent {

trendDataLabels: string[];
dataPercentages: string[];
trendData = [];
showData = false;
formValue: string;

  constructor(private retrieveDataService: RetrieveDataService) {}


    setZipCodeTrendData(zipCode: string) {
        this.retrieveDataService.getTrendByZipCode(zipCode)
            .then(response => {
                if (response.zipTrend) {
                    for (const zip of response.zipTrend) {
                        if (zip.zipCode === zipCode) {
                            this.resolveLabels(zip.policyTrend);
                            this.resolveDataPercentages(zip.policyTrend);
                            this.setupChart();
                        }
                    }
                }
            });
    }

    resolveLabels(data) {
        this.trendDataLabels = Object.keys(data);
    }

    resolveDataPercentages(data) {
        this.dataPercentages = Object.values(data);
    }

    setupChart() {
    if (this.showData) {
        const ctx = document.getElementById('barchart');
        this.trendData = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: this.trendDataLabels,
            datasets: [
            {
                label: 'InsuranceTrendByZipCode',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
                borderWidth: 1
            }
            ]
        },
        options: {
            responsive: false
            }
        });
    }
    }
}
