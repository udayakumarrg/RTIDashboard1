import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PieChartComponent } from './components/chart/pie-chart.component';
import { BarChartComponent } from './components/chart/bar-chart.component';
import { RetrieveDataService } from './services/retrieveData/retrieve-data.service';

const appRoutes: Routes = [
  {
    path: 'pie',
    component: PieChartComponent
  },
  {
    path: 'bar',
    component: BarChartComponent
  },
  { path: '',
    redirectTo: '/pie',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [RetrieveDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
