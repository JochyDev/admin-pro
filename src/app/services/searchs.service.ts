import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  constructor(
    private http: HttpClient
  ) { }

  get token(){
    return localStorage.getItem('token') || ''
  }

  search( tipo: 'user' | 'doctor' | 'hospital', termino: string) {

    // TODO: cambiar tipado de la respuesta
    return this.http.get<{ok: boolean, results: any[]}>(`${base_url}/todo/collection/${tipo}/${termino}`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (result) => {
        switch (tipo) {
          case 'user':
            return this.transformarUsers(result.results);
          
          case 'hospital':
            return this.transformarHospital(result.results);

          case 'doctor':
            return this.transformarDoctor(result.results);
          
          default:
            return [];
        }
      })
    )
  }

  transformarUsers( results: any[]): User[]{

      const users = results.map(
        user => new User(user.name, user.email, user.role, user.uid, '', user.img, user.google)
      )
      return users;
  }

  transformarHospital( results: any[]): Hospital[]{

    const hospitals = results.map(
      hospital => new Hospital( hospital.name, hospital._id, hospital.img, hospital.user)
    )
    return hospitals;
  } 

  transformarDoctor( results: any[]): Doctor[]{

    const doctors = results.map(
      doctor => new Doctor( doctor.name, doctor._id, doctor.img, doctor.user, doctor.hospital)
    )
    return doctors;
  } 
}
