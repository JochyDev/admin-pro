import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
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


  loadHospitals(){
    
    return this.http.get<{ok: boolean, hospitals: Hospital[]}>(
      `${base_url}/hospital`, this.headers
    )
    .pipe(
      map((result) =>  result.hospitals)
    )
  }

  createHospital(name: string){
    return this.http.post<{ok: boolean, hospital: Hospital}>(`${base_url}/hospital`, {name}, this.headers)
      .pipe( 
        map((result) => result.hospital))
  }

  updateHospital(_id: string, name: string){

    return this.http.put(
      `${base_url}/hospital/${_id}`, {name}, this.headers
      )
  }

  deleteHospital(_id: string){

    return this.http.delete(
      `${base_url}/hospital/${_id}`, this.headers
      )
  }
  

}
