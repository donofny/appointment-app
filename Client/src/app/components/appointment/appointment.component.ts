import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../appointments';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointmentList: Appointment[] = [];
  constructor(private as: AppointmentService) {}

  ngOnInit(): void {
    this.as
      .getAppointments()
      .subscribe((appointmentList) => (this.appointmentList = appointmentList));
  }
  addAppointment(appointment: Appointment) {
    this.as.addAppointment(appointment).subscribe((appointment) => {
      this.appointmentList.push(appointment);
      this.appointmentList = this.appointmentList.slice();
    });
  }
}
