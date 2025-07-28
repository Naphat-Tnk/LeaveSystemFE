import { Component, ViewChild, ElementRef} from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leavehistory',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './leavehistory.component.html',
  styleUrl: './leavehistory.component.css'
})
export class LeavehistoryComponent {

  @ViewChild('chart') chartRef!: ElementRef;

  Requests: any[] = [];
  AllRequests: any[] = [];
  sick: number = 0;
  holiday: number = 0;
  busy: number = 0;
  total: number = 0;
  leavesum: any[] = [];

  status : string = '';
  type : string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.callApi();
  }
  
  callApi() {
    this.http.get<any[]>('http://localhost:8080/api/leave-requests')
      .subscribe((response) => {
        this.AllRequests = response;
        this.Requests = response;
      
        this.leavesum = this.summary();
        this.updateChart();
      }, error => {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
        alert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
      });
  }

  updateChart() {
    const chartD = this.chartRef.nativeElement;

    const oldchart = echarts.getInstanceByDom(chartD);
    if(oldchart) oldchart.dispose();
    const chart = echarts.init(chartD);

    this.sick = 0;
    this.holiday = 0;
    this.busy = 0;

    //รวมวันลา
    this.leavesum.forEach((item: any) => {
      this.sick += item.sick;
      this.holiday += item.holiday;
      this.busy += item.busy;
    });
    
    const values : number[] = [];
    const type : string[] = [];

    //กราฟ
    if(this.type === 'ลาป่วย') {
      values.push(this.sick);
      type.push('ลาป่วย');
    } else if(this.type === 'ลาพักร้อน') {
      values.push(this.holiday);
      type.push('ลาพักร้อน');
    } else if(this.type === 'ลากิจ') {
      values.push(this.busy);
      type.push('ลากิจ');
    } else {
      values.push(this.sick, this.busy, this.holiday);
      type.push('ลาป่วย', 'ลากิจ', 'ลาพักร้อน');
    }
    
    const option = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: type
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: values,
          type: 'bar',
          itemStyle: {
            color: '#4e73df'
          }
        }
      ]
    };

    chart.setOption(option);
  }

  filterRequests() {
    const filter = this.AllRequests.filter((request: any) => {
     const type = this.type ? request.leaveTypeName == this.type : true;
     const status = this.status ? request.status == this.status : true;
     return type && status;
    });
    this.leavesum = this.summary(filter);
    this.updateChart();
  }

  //รวมวันลา/ต่อคน
  summary(data: any[] = this.AllRequests) {
    const result : any[] = [];

    data.forEach((request: any) => {
      const key = request.username + request.department;
      let user = result.find((r: any) => r.key === key);
      if(!user) {
        user = { key: key, username: request.username, department: request.department, sick: 0, holiday: 0, busy: 0, total: 0 };
        result.push(user);
      }
      if(request.leaveTypeName === 'ลาป่วย') {
        user.sick += request.days;
      } else if(request.leaveTypeName === 'ลาพักร้อน') {
        user.holiday += request.days;
      } else if(request.leaveTypeName === 'ลากิจ') {
        user.busy += request.days;
      }
      user.total += request.days;
    });
    return result;
  }

  exportExcel() {
    this.http.get('http://localhost:8080/api/exportExcel', { responseType: 'blob' })
      .subscribe(blob => {
        const file = new Blob([blob], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leaveSystem.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
  }
}
