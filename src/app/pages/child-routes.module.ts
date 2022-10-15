import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';
import { DoctorsComponent } from './mantenimientos/doctors/doctors.component';
import { DoctorComponent } from './mantenimientos/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: '',  component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'progress',  component: ProgressComponent, data: {titulo: 'ProgressBar'} },
  { path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Gráfica #1'} },
  { path: 'account-settings',  component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'} },
  { path: 'search/:term',  component: SearchComponent, data: {titulo: 'Busquedas'} },
  { path: 'promesas',  component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs',  component: RxjsComponent, data: {titulo: 'Rxjs'} },
  { path: 'profile',  component: ProfileComponent, data: {titulo: 'Perfil del Usuario'} },

  //Mantenimientos
  {path: 'users', component: UsersComponent, data: {titulo: 'Usuarios de aplicación'}, canActivate: [AdminGuard]},
  {path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Hospitales'}},
  {path: 'doctors', component: DoctorsComponent, data: {titulo: 'Médicos'}},
  {path: 'doctor/:id', component: DoctorComponent, data: {titulo: 'Médico'}}
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
