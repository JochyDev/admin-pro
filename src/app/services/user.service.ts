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

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get uid(){
    return this.user.uid || ''
  }

  saveLocalStorage(token: string, menu: string){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validarToken (){

    return this.http.get(`${base_url}/login/renew`, this.headers)
      .pipe(
        map( (resp:any) => {
          const {name, email, google, role, img = '', uid} = resp.user

          this.user = new User( name, email, role, uid, '', img, google );

          this.saveLocalStorage(resp.token, resp.menu);

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
        tap( (resp:any) =>{ 
          this.saveLocalStorage(resp.token, resp.menu);
        })
      )
  }

  updateUser(formData: profileForm){

    formData = {
      ...formData,
      role: this.user.role
    }

    return this.http.put(
      `${base_url}/users/${this.uid}`, formData, this.headers
      )
  }

  updateUserRole(user: User){

    return this.http.put(
      `${base_url}/users/${user.uid}`, user, this.headers
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
          this.saveLocalStorage(res.token, res.menu);

          return true;
        })
      )
  }


  googleSingIn(data: any){

    return this.http.post(`${base_url}/login/google`, data )
      .pipe( 
        map((res: any) => {
          this.saveLocalStorage(res.token, res.menu);
        
          return true;
        })
       )
  }

  logout(){
    localStorage.removeItem('token');
  }

  loadUsers(desde: number = 0){
    
    return this.http.get<{total: number, users: User[]}>(
      `${base_url}/users?desde=${desde}`, this.headers
    )
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
    return this.http.delete(`${base_url}/users/${id}`, this.headers );
  }

}


