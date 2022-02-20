import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxTocModule } from 'ngx-toc';

import { AppComponent } from './app.component';
import { Demo2Component } from './demo2/demo2.component';

const routes: Routes = [
  { path: 'demo2', component: Demo2Component }
];

@NgModule({
  declarations: [
    AppComponent,
    Demo2Component
  ],
  imports: [
    BrowserModule,
    NgxTocModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
