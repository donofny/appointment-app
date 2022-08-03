import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { AppointmentDisplayComponent } from './components/appointment-display/appointment-display.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { RoutingModule } from './routing/routing.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './auth.interceptor';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginButtonComponent,
    AppointmentDisplayComponent,
    AddAppointmentComponent,
    AppointmentComponent,
    HomeComponent,
    EditAppointmentComponent,
    AppointmentCalendarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
  ],
  exports: [
    LoginFormComponent,
    LoginButtonComponent,
    AppointmentDisplayComponent,
    AddAppointmentComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
