import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { NgxTocModule } from 'ngx-toc';

import { AppComponent } from './app.component';
import { Demo2Component } from './demo2/demo2.component';
import { Demo1Component } from './demo1/demo1.component';

const routes: Routes = [
  { path: 'demo1', component: Demo1Component },
  { path: 'demo2', component: Demo2Component },
  { path: '**', component: Demo2Component },
];

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    Demo2Component
  ],
  imports: [
    BrowserModule,
    NgxTocModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MarkdownModule.forRoot(
      { 
        loader: HttpClient,
        sanitize: SecurityContext.NONE, 
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
