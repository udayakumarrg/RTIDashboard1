import { Component, OnInit } from '@angular/core';
import { RetrieveDataService } from '../../services/retrieveData/retrieve-data.service'
import { WeatherViewModel } from '../../models/weatherView.model';
import { Chart } from 'chart.js';

class WeatherViewModelByYear {
  weatherViewModel: WeatherViewModel;
  year: string;
}

class Event {
  eventType: string;
  volume: number;
  year: string;
}

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html'
})

export class BarChartComponent {
  title = 'RTIDashboard';
  data: WeatherViewModel[] = [];
  weatherViewModelByYear: WeatherViewModelByYear[] = [];
  showTable = false;
  chart = [];
  incidents2012 = 0;
  incidents2013 = 0;
  incidents2014 = 0;
  incidents2015 = 0;
  incidents2016 = 0;
  incidents2017 = 0;

  constructor(private retrieveDataService: RetrieveDataService) {}

  sendData(state: string, disaster: string) {
    this.retrieveDataService.getWeather(state, disaster).then(response => {
      this.showTable = true;
      this.data = response;
      this.divideByYear();

    });


    }


  initGraph() {
    if (this.showTable) {
      const ctx = document.getElementById('barchart');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2012', '2013', '2014', '2016', '2017'],
          datasets: [
            {
              label: 'Tornados',
              backgroundColor: '#3e95cd',
              data: [this.incidents2012, this.incidents2013, this.incidents2014, this.incidents2016, this.incidents2017]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Tordados each year'
          }
        }
    });
  }
  }

  divideByYear() {
    // tslint:disable-next-line:prefer-const
    for (let block of this.data) {
      let year = block.incidentBeginDate.substring(0, 4);
      let tempWeatherViewModel = new WeatherViewModelByYear;
      tempWeatherViewModel.weatherViewModel = block;
      tempWeatherViewModel.year = year;
      this.weatherViewModelByYear.push(tempWeatherViewModel);
    }
    debugger;
    this.incidentsPerYear(this.weatherViewModelByYear);
  }

  incidentsPerYear(yearChunks: WeatherViewModelByYear[]) {
    // tslint:disable-next-line:prefer-const
    for (let yearChunk of yearChunks) {
      switch (yearChunk.year) {
        case '2012':
          this.incidents2012 ++;
          break;
        case '2013':
          this.incidents2013 ++;
          break;
        case '2014':
          this.incidents2014 ++;
          break;
        case '2015':
          this.incidents2015 ++;
          break;
        case '2016':
          this.incidents2016 ++;
          break;
      }
    }
    this.showTable = true;
    this.toggleChart();
  }
  toggleChart() {
    this.initGraph();
  }

}




