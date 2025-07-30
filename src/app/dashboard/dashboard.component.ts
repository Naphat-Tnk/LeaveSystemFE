import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import thLocale from '@fullcalendar/core/locales/th';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,FullCalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  totalremain: number = 0;
  totalused: number = 0;
  pending: number = 0;

  Balances: any[] = [];
  Requests: any[] = [];


  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getBalance();
    this.getRequests();
  }

  getBalance() {
    this.http.get('http://localhost:8080/api/leave-balances').subscribe((res: any) => {
      console.log('leave-balances', res);
      this.totalremain = res.reduce((sum: number, item: any) => sum + Number(item.remainDay || 0), 0);
      this.Balances = res;
    });
  }

  getRequests() {
    this.http.get('http://localhost:8080/api/leave-requests').subscribe((res: any) => {
      const year = new Date().getFullYear();

      this.pending = res.filter((request: any) => request.status === 'PENDING').length;
      
      this.totalused = res
      .filter((request: any) => request.status === 'APPROVED' && new Date(request.startDate).getFullYear() === year)
      .reduce((total: number, request: any) => total + this.countDays(new Date(request.startDate), new Date(request.endDate)), 0);
      console.log('leave-requests:', res);
      this.Requests = res.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).slice(0, 5);
    
    this.calendar();
    });
  }
  
  //เอาไว้คำนวณวันลากรณีข้ามเดือน
  countDays(start: Date, end: Date): number {
    if (!start || !end) {
      return 0;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  }

  //ปฏิทิน

  type: string = 'ทุกแผนก';

  calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: thLocale,
  events: [],
  headerToolbar: {
    left: '',
    center: 'title',
    right: 'prev,next today',
    },
  };

  calendar(){
    this.calendarOptions.events = this.Requests.filter((request: any) => request.status === 'APPROVED').map((request: any) => ({
      title: `${request.username} - ${request.leaveTypeName}`,
      start: request.startDate,
      end: request.endDate ? this.addDay(request.endDate) : this.addDay(request.startDate),
      backgroundColor: this.color(request.leaveTypeName),
      borderColor: this.color(request.leaveTypeName),
    }));
  }

  addDay(date: string) : string{
    const dat = new Date(date);
    dat.setDate(dat.getDate() + 1);
    return dat.toISOString().split('T')[0];
  }

  color(type: string){
    switch (type) {
      case 'ลาป่วย':
        return '#6EA9ED';
      case 'ลาพักร้อน':
        return '#DE7CB2';
      case 'ลากิจ':
        return '#F59C29';
      default:
        return '#fe96a1';
    }
  }
}