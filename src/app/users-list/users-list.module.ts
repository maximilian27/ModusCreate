import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { UsersListRoutingModule } from './users-list-routing.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    CoreModule,
    UsersListRoutingModule
  ],
})
export class UsersListModule { }
