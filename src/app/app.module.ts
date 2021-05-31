import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import 'pepjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Page001Component } from './page-001/page-001.component';
import { Page001Module } from './page-001/page-001.module';
import { Page002Component } from './page-002/page-002.component';
import { Page002Module } from './page-002/page-002.module';
import { WindowRefService } from './shared/services/window-ref.service';

@NgModule({
    declarations: [
      AppComponent,
      Page001Component,
      Page002Component
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        Page001Module,
        Page002Module,
        AppRoutingModule
    ],
    providers: [
      WindowRefService
    ],
    bootstrap: [AppComponent],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
