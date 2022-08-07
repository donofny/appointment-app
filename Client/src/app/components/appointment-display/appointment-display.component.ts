import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/appointments';
import { AppointmentService } from 'src/app/services/appointment.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointment-display',
  templateUrl: './appointment-display.component.html',
  styleUrls: ['./appointment-display.component.css'],
})
export class AppointmentDisplayComponent implements OnInit {
  faTimes = faTimes;
  @Input()
  appointmentList: Appointment[] = [];
  isCalendarView: boolean = false;
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}
  deleteAppointment(appointment: Appointment, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.appointmentService
      .deleteAppointment(appointment)
      .subscribe(
        () =>
          (this.appointmentList = this.appointmentList.filter(
            (a) => a.id !== appointment.id
          ))
      );
      window.location.reload();
  }
  startFormat(appointment: Appointment) {
    var d = new Date(appointment.start);
    return d.toLocaleString();
  }
  createdFormat(appointment: Appointment) {
    var d = new Date(appointment.created);
    return d.toLocaleString();
  }
  lastChangedFormat(appointment: Appointment) {
    var d = new Date(appointment.lastChanged);
    return d.toLocaleString();
  }
}
