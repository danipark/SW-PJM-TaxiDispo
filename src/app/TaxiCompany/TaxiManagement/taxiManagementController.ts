import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { TaxiService } from '../TaxiUnternehmen/Services/taxi.service';
import { JourneyService } from '../../Journey/Services/journey.service';
import { TaxirouteService } from './Services/taxiroute.service';


@Component({
  selector: 'app-taxiManagement',
  templateUrl: 'taxiManagementView.html',
  styleUrls: ['taxiManagement.scss']
})
export class TaxiManagementPage implements OnInit {
  @ViewChild('barChartKM') childBarChartKM;
  @ViewChild('barChartSales') childBarChartSales;
  @ViewChild('pieChartSales') pieChartSales;
  bars: any;
  colorArray: any;
  pies: any;
  barChartSales: any;
  barChartKM: any;
  colorPies: any;
  Taxis: any = [];
  Journeys: any = [];
  TaxiRoutes: any = [];

  salesArray = [];
  kmArray = [];
  monat: any = [];

  //Variablen für Sales
  janSales = 0;
  febSales = 0;
  maeSales = 0;
  aprSales = 0;
  maiSales = 0;
  junSales = 0;
  julSales = 0;
  augSales = 0;
  sepSales = 0;
  oktSales = 0;
  novSales = 0;
  dezSales = 0;
  totalSales = 0;

    //Variablen für KM
    janKM = 0;
    febKM = 0;
    maeKM = 0;
    aprKM = 0;
    maiKM = 0;
    junKM = 0;
    julKM = 0;
    augKM = 0;
    sepKM = 0;
    oktKM = 0;
    novKM = 0;
    dezKM = 0;
    totalKM = 0

  constructor(
    private taxiService: TaxiService,
    private journeyService: JourneyService,
    private taxiRouteService: TaxirouteService,
  ) { }



  monthArray = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  months = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 1 },
    { month: 'Mar', value: 2 },
    { month: 'Apr', value: 3 },
    { month: 'Mai', value: 4 },
    { month: 'Jun', value: 5 },
    { month: 'Jul', value: 6 },
    { month: 'Aug', value: 7 },
    { month: 'Sep', value: 8 },
    { month: 'Okt', value: 9 },
    { month: 'Nov', value: 10 },
    { month: 'Dez', value: 11 },];

  fromMonth = '0';
  toMonth = '11';


  ngOnInit() {


  }

  ionViewDidEnter() {


    this.taxiService.getTaxiList().subscribe((res) => {
      this.Taxis = res;
      console.log(this.Taxis);
    });

    this.journeyService.getJourneyList().subscribe((res) => {
      this.Journeys = res;
      console.log(this.Journeys);


    });

    this.taxiRouteService.getTaxirouteList().subscribe((res) => {
      this.TaxiRoutes = res;
      console.log(this.TaxiRoutes);
      console.log(this.TaxiRoutes.length);
      //YYY-MM-DD
      for (let i = 0; i < this.TaxiRoutes.length; i++) {
        var sales = {
          date: Number,
          price: Number
        };
        sales.date = this.TaxiRoutes[i].date.split("-")[1];
        sales.price = this.TaxiRoutes[i].price;
        this.salesArray.push(sales);

        var km = {
          date: Number,
          completeDistance: Number
        };
        km.date = this.TaxiRoutes[i].date.split("-")[1];
        km.completeDistance = this.TaxiRoutes[i].completeDistance;
        this.kmArray.push(km);
      };

      console.log(this.kmArray);

      this.createSalesData();
      this.createKMData();
      this.generateColorPies(12);
      this.createBarChartKM();
      this.createBarChartSales();
      this.createPieChartSales();
    });

  }

  generateColorPies(num) {
    this.colorPies = [];
    for (let i = 0; i < num; i++) {
      this.colorPies.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }

  }

  createBarChartKM() {
    this.barChartKM = new Chart(this.childBarChartKM.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        datasets: [{
          label: 'in KM',
          data: [this.janKM, this.febKM, this.maeKM, this.aprKM, 
            this.maiKM, this.junKM, this.julKM, this.augKM, this.sepKM, 
            this.oktKM, this.novKM, this.dezKM],
          backgroundColor: this.colorPies, // array should have same number of elements as number of dataset
          borderColor: this.colorPies,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createBarChartSales() {
    this.barChartSales = new Chart(this.childBarChartSales.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        datasets: [{
          label: 'in €',
          data: [this.janSales, this.febSales, this.maeSales, this.aprSales, this.maiSales, this.junSales, this.julSales, this.augSales, this.sepSales, this.oktSales, this.novSales, this.dezSales],
          backgroundColor: this.colorPies, // array should have same number of elements as number of dataset
          borderColor: this.colorPies,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createPieChartSales() {
    this.pies = new Chart(this.pieChartSales.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        datasets: [{
          label: 'in %',
          data: [this.janSales / this.totalSales,
          (this.febSales / this.totalSales) * 100, (this.maeSales / this.totalSales) * 100,
          (this.aprSales / this.totalSales) * 100, (this.maiSales / this.totalSales) * 100,
          (this.junSales / this.totalSales) * 100, (this.julSales / this.totalSales) * 100,
          (this.augSales / this.totalSales) * 100, (this.sepSales / this.totalSales) * 100,
          (this.oktSales / this.totalSales) * 100, (this.novSales / this.totalSales) * 100,
          (this.dezSales / this.totalSales) * 100],
          backgroundColor: this.colorPies, // array should have same number of elements as number of dataset
          borderColor: this.colorPies,// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });
  }



  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.dataset[dataSetIndex].data = data;
    chart.update();
  }

  applyMonthFilterBarChartSales() {
    this.barChartSales.data.labels = this.monthArray.slice(parseInt(this.fromMonth), parseInt(this.toMonth) + 1);
    this.barChartSales.update();
  }

  applyMonthFilterBarChartKM() {
    this.barChartKM.data.labels = this.monthArray.slice(parseInt(this.fromMonth), parseInt(this.toMonth) + 1);
    this.barChartKM.update();
  }
  createSalesData() {
    var jan = "01";
    var feb = "02";
    var mae = "03";
    var apr = "04";
    var mai = "05";
    var jun = "06";
    var jul = "07";
    var aug = "08";
    var sep = "09";
    var okt = "10";
    var nov = "11";
    var dez = "12";


    for (var i = 0; i < this.salesArray.length; i++) {


      console.log(this.salesArray[i].date);

      switch (this.salesArray[i].date) {
        case jan:
          this.janSales = this.janSales + this.salesArray[i].price;
          break;

        case feb:
          this.febSales = this.febSales + this.salesArray[i].price;
          break;

        case mae:
          this.maeSales = this.maeSales + this.salesArray[i].price;
          break;

        case apr:
          this.aprSales = this.aprSales + this.salesArray[i].price;
          break;

        case mai:
          this.maiSales = this.maiSales + this.salesArray[i].price;
          break;

        case jun:
          this.junSales = this.junSales + this.salesArray[i].price;
          break;

        case jul:
          this.julSales = this.julSales + this.salesArray[i].price;
          break;

        case aug:
          this.augSales = this.augSales + this.salesArray[i].price;
          break;

        case sep:
          this.sepSales = this.sepSales + this.salesArray[i].price;
          break;

        case okt:
          this.oktSales = this.oktSales + this.salesArray[i].price;
          break;

        case nov:
          this.novSales = this.novSales + this.salesArray[i].price;
          break;

        case dez:
          this.dezSales = this.dezSales + this.salesArray[i].price;
          break;

      }
      this.totalSales = this.janSales + this.febSales +
        this.maeSales + this.aprSales + this.maiSales +
        this.aprSales + this.junSales + this.julSales +
        this.augSales + this.sepSales + this.oktSales +
        this.novSales + this.dezSales
    }
  }
  createKMData(){
    var jan = "01";
    var feb = "02";
    var mae = "03";
    var apr = "04";
    var mai = "05";
    var jun = "06";
    var jul = "07";
    var aug = "08";
    var sep = "09";
    var okt = "10";
    var nov = "11";
    var dez = "12";


    for (var i=0; i<this.kmArray.length; i++){
      
      
      console.log(this.kmArray[i].date);
      
    switch(this.kmArray[i].date){
      case jan:
        this.janKM = this.janKM + this.kmArray[i].completeDistance;
      break;

      case feb:
        this.febKM = this.febKM + this.kmArray[i].completeDistance;
      break;

      case mae:
        this.maeKM = this.maeKM + this.kmArray[i].completeDistance;
      break;

      case apr:
        this.aprKM = this.aprKM + this.kmArray[i].completeDistance;
      break;

      case mai:
        this.maiKM = this.maiKM + this.kmArray[i].completeDistance;
      break;

      case jun:
        this.junKM = this.junKM + this.kmArray[i].completeDistance;
      break;

      case jul:
        this.julKM = this.julKM + this.kmArray[i].completeDistance;
      break;

      case aug:
        this.augKM = this.augKM + this.kmArray[i].completeDistance;
      break;

      case sep:
        this.sepKM = this.sepKM + this.kmArray[i].completeDistance;
      break;

      case okt:
        this.oktKM = this.oktKM + this.kmArray[i].completeDistance;
      break;

      case nov:
        this.novKM = this.novKM + this.kmArray[i].completeDistance;
      break;

      case dez:
        this.dezKM = this.dezKM + this.kmArray[i].completeDistance;
      break;

    }
    this.totalKM = this.janKM + this.febKM + 
    this.maeKM + this.aprKM + this.maiKM + 
    this.aprKM + this.junKM + this.julKM + 
    this.augKM + this.sepKM + this.oktKM + 
    this.novKM + this.dezKM
    console.log(this.totalKM);
  }
  }

}

