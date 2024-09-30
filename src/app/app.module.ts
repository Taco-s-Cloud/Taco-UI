// app.module.ts
// Root module of the Angular application.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
    // TODO: Declare additional components here
  ],
  imports: [
    BrowserModule,
    //copied from Taco-UI/src/app/app.module.ts
    FormsModule,
    HttpClientModule
    // TODO: Import HttpClientModule to make HTTP requests to microservices
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
