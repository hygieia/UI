import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
tab : String = 'dashboards';
  constructor() { }

  ngOnInit() {
  }

  navigateToTab(tab){
    this.tab = tab;
  }
}
