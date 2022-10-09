import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';



declare const google: any;
const googleId: string = environment.GOOGLE_ID;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  private email!: string;

  public loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) { }


  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    if(this.email.length){
      this.loginForm.get('email')?.setValue(this.email);
      this.loginForm.get('remember')?.setValue(true);
    }

    this.initGoogleSingIn();
    
  }

  login(){

    this.formSubmitted = true;
    
    if(this.loginForm.invalid){
      return;
    }

    this.userService.login( this.loginForm.value ).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    });
  }

  campoNoValido(campo: string): boolean{
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  handleCredentialResponse(response: any) {

    const id_token = response.credential
    const data = {id_token}

  

    this.userService.googleSingIn(data).subscribe({
      next: () => {
        this.ngZone.run( () => {
          this.router.navigateByUrl('/')
        })
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
          
  }


  initGoogleSingIn() {
    google.accounts.id.initialize({
      client_id: googleId,
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {type: 'icon'}  // customization attributes
    );
  }

}