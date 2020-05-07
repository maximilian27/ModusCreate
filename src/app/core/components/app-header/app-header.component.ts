import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AppService } from '../../services/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-e-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
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

  signup() {
    this.service.login();
  }
}
