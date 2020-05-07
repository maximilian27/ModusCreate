import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { ApiUser } from '../core/models/api-user.model';

@Component({
  selector: 'ng-e-app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public usersList: ApiUser[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(result => this.usersList = result.data);
  }
}
