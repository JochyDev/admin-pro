import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { profileForm } from '../interfaces/profileForm.interface';

import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(
    private http: HttpClient
  ) { }

  get token(){
    return localStorage.getItem('token') || ''
  }

  get uid(){
    return this.user.uid || ''
  }

  validarToken (){

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token 
      }
    }).pipe(
      map( (resp:any) => {

        const {name, email, google, role, img = '', uid} = resp.user

        this.user = new User( name, email, role, uid, '', img, google );
        localStorage.setItem('token', resp.token )
        return true;
      }),
      catchError( (err: any) => {
        return of(false)
      })
      )
  }

  createUser(formData: RegisterForm){
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap( (resp:any) => localStorage.setItem('token', resp.token ))
      )
  }

  updateUser(formData: profileForm){

    formData = {
      ...formData,
      role: this.user.role
    }



    return this.http.put(
      `${base_url}/users/${this.uid}`, formData,
      {
        headers: {
          'x-token': this.token
        }
      })
  }

  updateUserRole(user: User){

    return this.http.put(
      `${base_url}/users/${this.user.uid}`, user,
      {
        headers: {
          'x-token': this.token
        }
      })
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

  loadUsers(desde: number = 0){

    let httpParams = new HttpParams();
    httpParams = httpParams.set('desde', desde);
    
    return this.http.get<{total: number, users: User[]}>(`${base_url}/users`,
    {
      headers: {
        'x-token': this.token
      },
      params: httpParams  
    })
    .pipe(
      map((result) => {
        const users = result.users.map(
          user => new User(user.name, user.email, user.role, user.uid, '', user.img, user.google)
        )
        return {
          total: result.total,
          users
        };
      })
    )
  }

  deleteUser(id: string){
    return this.http.delete(`${base_url}/users/${id}`, {
      headers: {
        'x-token': this.token
      }
    });
  }

}


