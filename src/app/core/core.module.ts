import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppContentComponent } from './components/app-content/app-content.component';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [AppHeaderComponent, AppContentComponent],
  exports: [AppHeaderComponent, AppContentComponent],
})
export class CoreModule {}
