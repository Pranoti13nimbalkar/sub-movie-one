import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDashboardComponent } from './shared/components/movie-dashboard/movie-dashboard.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MovieFormComponent } from './shared/components/movie-form/movie-form.component';
import { GetconfirmComponent } from './shared/components/getconfirm/getconfirm.component';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LodderInterceptor } from './lodder.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieDashboardComponent,
    MovieCardComponent,
    MovieFormComponent,
    GetconfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
     MaterialModule,
     HttpClientModule,
     ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:LodderInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
