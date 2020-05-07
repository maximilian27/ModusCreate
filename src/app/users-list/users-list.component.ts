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
  public pages: number[];
  public currentPage: number;

  constructor(private userService: UserService) {
    this.pages = [];
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.getUsers(this.currentPage);
  }

  getUsers(page: number) {
    this.userService.getUsers(page)
      .subscribe((result) => {
        this.usersList = result.data;
        this.generatePages(result.total_pages);
      });
  }

  generatePages(numberOfPages: number) {
    this.pages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    this.getUsers(this.currentPage);
  }
}
