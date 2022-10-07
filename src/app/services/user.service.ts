import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  validarToken (){
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token 
      }
    }).pipe(
      tap( (resp:any) => localStorage.setItem('token', resp.token )),
      map( (resp) => true),
      catchError( err => of(false))
      )
  }

  createUser(formData: RegisterForm){
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap( (resp:any) => localStorage.setItem('token', resp.token ))
      )
  }

  login(formData: LoginForm){

    if(formData.remember){
      localStorage.setItem('email', formData.email);
    }else{
      localStorage.removeItem('email')
    }

    return this.http.post(`${base_url}/login`, formData)
                    .pipe( 
                      map((res: any) => {
                        localStorage.setItem('token', res.token);

                        return true;
                      })
                     )
  }


  googleSingIn(data: any){


    return this.http.post(`${base_url}/login/google`, data )
        .pipe( 
          map((res: any) => {
            localStorage.setItem('token', res.token);
          
            return true;
          })
         )
  }

  logout(){
    localStorage.removeItem('token');
  }

}
