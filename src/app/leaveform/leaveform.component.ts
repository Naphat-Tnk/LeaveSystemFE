import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-leaveform',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './leaveform.component.html',
  styleUrl: './leaveform.component.css'
})
export class LeaveFormComponent {

  constructor(private http: HttpClient) { }

  leaveType = [
    { id: 1, name: 'ลาป่วย' },
    { id: 2, name: 'ลาพักร้อน' },
    { id: 3, name: 'ลากิจ' },
  ]

  leaveForm = {
    leaveId: null,
    startDate: '',
    endDate: '',
    reason: '',
  }

  resetForm() {
    this.leaveForm = {
      leaveId: null,
      startDate: '',
      endDate: '',
      reason: '',
    }
  }

  validateForm() {
    if (this.leaveForm.leaveId === null || this.leaveForm.startDate === '' || this.leaveForm.endDate === '' || this.leaveForm.reason === '') {
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    const leaveRequest = {
      leaveId: this.leaveForm.leaveId,
      startDate: this.leaveForm.startDate,
      endDate: this.leaveForm.endDate,
      reason: this.leaveForm.reason,
    }
    this.http.post('http://localhost:8080/api/leave-requests', leaveRequest).subscribe((res: any) => {
      alert('ส่งคำขอลาสำเร็จ');
      this.resetForm();
    }, (err: any) => {
      alert('เกิดข้อผิดพลาด');
    })
  }
}
