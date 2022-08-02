import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/appointments';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent implements OnInit {
  @Output() onAddAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Output() onEditAppointment: EventEmitter<Appointment> = new EventEmitter();
  @Input() appointment?: Appointment | null;
  name!: string;
  description!: string;
  duration!: number;
  start!: Date;
  created!: Date;
  lastChanged!: Date;
  id: any;
  constructor() {}

  ngOnInit(): void {
    if (this.appointment) {
      this.id = this.appointment.id;
      this.name = this.appointment.name;
      this.description = this.appointment.description;
      this.duration = this.appointment.duration;
      this.start = this.appointment.start;
      this.created = this.appointment.created;
      this.lastChanged = this.appointment.lastChanged;
    }
  }
  onSubmit() {
    if (!(this.name && this.description && this.duration && this.start)) {
      alert('Input invalid');
      return;
    }
    if(Object.prototype.toString.call(this.start) !== "[object Date]"){
      alert('Please enter a valid date');
      return;
    }
    const model = {
      id: this.id,
      name: this.name,
      description: this.description,
      duration: this.duration,
      start: this.start,
      created: new Date(),
      lastChanged: new Date(),
    };
    if (this.id) {
      this.onEditAppointment.emit(model);
    } else {
      this.onAddAppointment.emit(model);
    }

    this.appointment = null;
    this.id = 0;
    this.name = '';
    this.description = '';
    this.duration = 0;
    this.start = new Date();
    this.created = new Date();
    this.lastChanged = new Date();
  }
}
