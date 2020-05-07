import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../core/services/user.service';

@Component({
  selector: 'ng-e-app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public userDetails: any;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserDetails(id)
      .subscribe(result => this.userDetails = result.data);
  }
}
