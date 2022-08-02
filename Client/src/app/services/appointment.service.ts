import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/appointments';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/appointment';
  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  deleteAppointment(appointment: Appointment) {
    const url = `${this.apiUrl}/${appointment.id}`;
    return this.http.delete(url);
  }
  updateAppointment(appointment: Appointment) {
    const url = `${this.apiUrl}/${appointment.id}`;
    return this.http.put(url, appointment);
  }
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment, httpOptions);
  }
  getAppointment(appointmentID: any) {
    const url = `${this.apiUrl}/${appointmentID}`;
    return this.http.get<Appointment>(url);
  }
}
