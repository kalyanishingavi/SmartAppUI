import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { MasterService } from 'src/app/services/master.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private service:MasterService) { }

  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];
  colordata:any[]=[];


  ngOnInit(): void {
    this.service.GetChartinfo().subscribe(result=>{
      this.chartdata=result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length; i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].year);
          this.labeldata.push(this.chartdata[i].amount);
          this.labeldata.push(this.chartdata[i].colorcode);

        }
        //this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'pie', 'piechart');
      }
    });
    
  }

  RenderChart(labeldata:any, maindata:any, colordata:any, type:any, id:any){

    new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

   }
