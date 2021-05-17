import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { PropertiesComponent } from './configuration/properties/properties.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    PropertiesComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatSidenavModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
