import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveFormComponent } from './leaveform/leaveform.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,DashboardComponent, LeaveFormComponent, LeavehistoryComponent,AdminComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeaveSystemFE';

}
