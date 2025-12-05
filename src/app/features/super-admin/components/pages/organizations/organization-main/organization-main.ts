import { Component } from '@angular/core';
import { AdminMetricCardComponent } from '../../metric-card/metric-card.component';
import { OrganizationList } from '../organization-list/organization-list';

@Component({
  selector: 'app-organization-main',
  imports: [
    AdminMetricCardComponent,
    OrganizationList,
  ],
  templateUrl: './organization-main.html',
  styleUrl: './organization-main.scss',
})
export class OrganizationMain {

}
