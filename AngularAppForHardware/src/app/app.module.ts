import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import { HardwareDetailsComponent } from './hardware-details/hardware-details.component';
import {EmptyRouteComponent} from './empty-route/empty-route.component';
export const createTranslateLoader=function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:4204/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HardwareDetailsComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
