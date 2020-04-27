import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit {

  error: any = {};
  users: any[] = [];
  userSearch = '';

  constructor(private userData: UserDataService) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userData.users().subscribe((response: any) => {
      this.users = response;
      console.log('users ', response);
    });
  }
  promoteUserToAdmin(user) {

  }

  demoteUserFromAdmin(user) {

  }
}
