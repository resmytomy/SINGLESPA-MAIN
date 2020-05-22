import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import {EmptyRouteComponent} from './empty-route/empty-route.component';
import { LoggerComponent } from './logger/logger.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    LoggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
