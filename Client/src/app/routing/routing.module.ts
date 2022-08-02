import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AppointmentComponent } from '../components/appointment/appointment.component';
import { LoggedinGuard } from '../loggedin.guard';
import { EditAppointmentComponent } from '../components/edit-appointment/edit-appointment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'appointment',
    canActivate: [LoggedinGuard],
    component: AppointmentComponent
  },
  {
    path: 'appointment/:id',
    canActivate: [LoggedinGuard],
    component: EditAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
