import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Appointment } from '../../appointments';
import { Calendar } from '../../fullcalendar-types';

declare var FullCalendar: any;

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent implements OnInit, OnChanges {
  calendarEl: HTMLElement;
  @Input() appointments: Appointment[] = [];
  calendar!: Calendar;
  constructor(elementRef: ElementRef, private router: Router) {
    this.calendarEl = elementRef.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.calendar) return;
    this.calendar.render();
    const ids = this.calendar.getEvents().map((e) => e.id);
    const uniqueIds = new Set(ids);
    this.appointments.forEach((a) => {
      if (!uniqueIds.has(a.id?.toString())) {
        this.calendar.addEvent({
          id: a.id?.toString(),
          start: new Date(a.start),
          title: a.name,
        });
      }
    });
  }

  ngOnInit() {
    this.calendar = new FullCalendar.Calendar(this.calendarEl, {
      aspectRatio: 1.45,
      eventClick: (info: any) => this.onEventClick(info),
      initialView: 'dayGridMonth',
    });

    this.calendar.render();
    this.appointments.forEach((a) => {
      this.calendar.addEvent({
        id: a.id?.toString(),
        start: new Date(a.start),
        title: a.name,
      });
    });
  }
  onEventClick(info: any) {
    const event: CalendarEvent = info.event;
    if (event) {
      this.router.navigate(['/appointment', event.id]);
    }
  }
}
