import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';
import { DoctorsComponent } from './mantenimientos/doctors/doctors.component';
import { DoctorComponent } from './mantenimientos/doctors/doctor.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard], 
        children: [
          { path: '',  component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress',  component: ProgressComponent, data: {titulo: 'ProgressBar'} },
          { path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Gráfica #1'} },
          { path: 'account-settings',  component: AccountSettingsComponent, data: {titulo: 'Ajustes de cuenta'} },
          { path: 'promesas',  component: PromesasComponent, data: {titulo: 'Promesas'} },
          { path: 'rxjs',  component: RxjsComponent, data: {titulo: 'Rxjs'} },
          { path: 'profile',  component: ProfileComponent, data: {titulo: 'Perfil del Usuario'} },

          //Mantenimientos
          {path: 'users', component: UsersComponent, data: {titulo: 'Usuarios de aplicación'}},
          {path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Hospitales'}},
          {path: 'doctors', component: DoctorsComponent, data: {titulo: 'Médicos'}},
          {path: 'doctor/:id', component: DoctorComponent, data: {titulo: 'Médico'}}
        ]
      },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class PagesRoutingModule {}
