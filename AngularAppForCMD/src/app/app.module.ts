import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EmptyRouteComponent }  from './empty-route/empty-route.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalViewComponent } from './terminal-view/terminal-view.component';

@NgModule({
  declarations: [
    AppComponent,EmptyRouteComponent, TerminalViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
