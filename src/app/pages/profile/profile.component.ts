import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user: User;
  public imgToUpload!: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) { 
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    
    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required],
      email: [ this.user.email, [Validators.required, Validators.email]]
    })
  }

  updateProfile(){
    
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: () => {
        const { name, email } = this.profileForm.value;
        this.user.email = email;
        this.user.name = name;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    })
  }

  changeImage(event: any){
    const file = event.target.files[0]
    this.imgToUpload = file;

    if(!file ) {
      this.imgTemp = null
      return
    };
    
    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onload = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage(){
    this.fileUploadService.updateImage(this.imgToUpload, 'users', this.user.uid)
    .then( img => {
      this.user.img = img;
      Swal.fire('Guardado', 'Imagen de Usuario Anctulizada', 'success')
    })
    .catch( err => {
      console.log(err)
      Swal.fire('Error', 'No se pudo subir la imagen', 'error')
    })

  }

  

}
