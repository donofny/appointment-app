import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../appointments';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css'],
})
export class EditAppointmentComponent implements OnInit {
  appointment!: Appointment;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apptService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.apptService.getAppointment(id).subscribe({
        next: (a) => (this.appointment = a),
        error: (err) => {
          if(err instanceof HttpErrorResponse){
            if(err.status == HttpStatusCode.NotFound){
              this.router.navigate(['/not-found']);
            }
          }
        },
        complete: () => console.log('get appointment request completed'),
      });
    });
  }
  onEdit(app: Appointment) {
    this.apptService
      .updateAppointment(app)
      .subscribe((a) => this.router.navigate(['/appointment']));
  }
}
