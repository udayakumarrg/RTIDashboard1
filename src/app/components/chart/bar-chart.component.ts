import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../../services/retrieveData/retrieve-data.service'
import { WeatherViewModel, DisasterDeclarationsSummaries } from '../../models/weatherView.model';
import { Chart } from 'chart.js';

class WeatherViewModelByYear {
  declarationSummary: DisasterDeclarationsSummaries;
  disasterType: string;
}


@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html'
})

export class BarChartComponent {
  title = 'RTIDashboard';
  data: WeatherViewModel = new WeatherViewModel;
  weatherViewModelByDisaster: WeatherViewModelByYear[] = [];
  showTable = false;
  chart = [];
  tornadoes = 0;
  floods = 0;
  hurricanes = 0;
  other = 0;
  hurricanNumber = 0;
  floodsNUmber = 0;
  tornadoNumber = 0;

  constructor(private retrieveDataService: RetrieveDataService) {}

  sendData(state: string, disaster: string) {
    this.retrieveDataService.getWeather(state).then(response => {
      this.showTable = true;
      this.data = response;
      this.divideByDisaster(this.data);

    });


    }


  initGraph() {
    if (this.showTable) {
      const ctx = document.getElementById('barchart');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Tornadoes', 'Hurricanes', 'Floods', 'Other'],
          datasets: [
            {
              label: 'Disasters',
              backgroundColor: '#3e95cd',
              data: [this.tornadoes, this.hurricanes, this.floods, this.other]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Disasters over last two years'
          }
        }
    });
  }
  }

  divideByDisaster(data: WeatherViewModel) {
    // tslint:disable-next-line:prefer-const
    for (let block of data.DisasterDeclarationsSummaries) {
      debugger;
      let disasterType = block.incidentType;
      let tempWeatherViewModel = new WeatherViewModelByYear;
      tempWeatherViewModel.declarationSummary = block;
      tempWeatherViewModel.disasterType = disasterType;
      this.weatherViewModelByDisaster.push(tempWeatherViewModel);
    }
    debugger;
    this.incidentsPerYear(this.weatherViewModelByDisaster);
  }

  incidentsPerYear(diasters: WeatherViewModelByYear[]) {
    // tslint:disable-next-line:prefer-const
    for (let disaster of diasters) {
      if(disaster.disasterType === 'Hurricane' && disaster.declarationSummary.disasterNumber !== this.hurricanNumber) {
        this.hurricanes ++;
        this.hurricanNumber = disaster.declarationSummary.disasterNumber;
      }
      else if(disaster.disasterType === 'Flood' && disaster.declarationSummary.disasterNumber !== this.floodsNUmber) {
        this.floods ++;
        this.floodsNUmber = disaster.declarationSummary.disasterNumber;
      }
      else if(disaster.disasterType === 'Tornado' && disaster.declarationSummary.disasterNumber !== this.tornadoNumber) {
        this.tornadoes ++;
        this.tornadoNumber = disaster.declarationSummary.disasterNumber;
      }
    }
    this.showTable = true;
    this.toggleChart();
  }
  toggleChart() {
    this.initGraph();
  }

}




