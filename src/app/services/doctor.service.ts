import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient
  ) { }

  get token(){
    return localStorage.getItem('token') || ''
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  loadDoctors(){
    
    return this.http.get<{ok: boolean, doctors: Doctor[]}>(
      `${base_url}/doctor`, this.headers
    )
    .pipe(
      map((result) =>  result.doctors)
    )
  }

  getDoctorById(id: string){
    return this.http.get<{ok: boolean, doctor: Doctor}>(
      `${base_url}/doctor/${id}`, this.headers
    )
    .pipe(
      map((result) =>  result.doctor)
    )
  }

  createDoctor( doctor: {name: string, hospital: string} ){
    return this.http.post<{ok: boolean, doctor: Doctor}>(`${base_url}/doctor`, doctor , this.headers)
      .pipe( 
        map((result) => result.doctor))
  }

  updateDoctor(doctor: Doctor){

    return this.http.put<{ok: boolean, doctorActualizado: Doctor}>(
      `${base_url}/doctor/${doctor._id}`, doctor, this.headers
    )
    .pipe( 
      map(result => result.doctorActualizado)
    )
  }

  deleteDoctor(_id: string){

    return this.http.delete(
      `${base_url}/doctor/${_id}`, this.headers
      )
  }
}
