import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveFormComponent } from './leaveform/leaveform.component';
import { LeavehistoryComponent } from './leavehistory/leavehistory.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'leaveform', component: LeaveFormComponent },
    { path: 'leavehistory', component: LeavehistoryComponent },
    { path: 'admin', component: AdminComponent },
];
