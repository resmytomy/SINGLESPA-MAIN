import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import {EmptyRouteComponent} from './empty-route/empty-route.component';
import {FileEditorComponent} from'./file-editor/file-editor.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const createTranslateLoader=function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    FileEditorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,BrowserAnimationsModule, 
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
