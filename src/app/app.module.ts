import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTocModule } from 'ngx-toc';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTocModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
