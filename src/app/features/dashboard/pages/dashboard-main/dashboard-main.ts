import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-main',
  imports: [
    SidebarComponent, DashboardComponent
  ],
  templateUrl: './dashboard-main.html',
  styleUrl: './dashboard-main.scss',
})
export class DashboardMain {

}
