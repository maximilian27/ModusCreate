import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'ng-e-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit {
  user: User = {
    firstName: 'Ahsan',
    lastName: 'Ayaz'
  };
  isLoggedIn: boolean;
  public subscriptions: Subscription;

  constructor(private service: AppService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    // retrieve the login status
    this.subscriptions.add(this.service.isLoggedIn
      .subscribe(result => {
        this.isLoggedIn = result;
      })
    );
  }

  login() {
    this.service.login();
  }

  logout() {
    this.service.logout();
  }
}
