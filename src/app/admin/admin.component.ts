import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  leaveRequests: any[] = [];

  constructor(private http: HttpClient) { }

  TypeName = [
    { id: 1, name: 'ลาป่วย' },
    { id: 2, name: 'ลาพักร้อน' },
    { id: 3, name: 'ลากิจ' },
  ]

  Requests(){
    this.http.get('http://localhost:8080/api/leave-requests').subscribe((res: any) => {
      this.leaveRequests = res.filter((request: any) => request.status === 'PENDING');
    });
  }

  updateStatus(id: number, status: string){
    console.log(id, status);
    this.http.put('http://localhost:8080/api/leave-requests/'+id, { status: status }).subscribe((res: any) => {
      this.Requests();
      alert('อัปเดตสถานะเรียบร้อย ' + status);
    }, (err: any) => {
      alert('เกิดข้อผิดพลาด ' + err.message);
    });
  }

  ngOnInit(): void {
    this.Requests();
  }

}
