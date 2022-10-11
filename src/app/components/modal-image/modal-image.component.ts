import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imgToUpload!: File;
  public imgTemp: any = null;

  constructor( 
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
    ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalImageService.closeModal()
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type

    this.fileUploadService.updateImage(this.imgToUpload, type, id)
    .then( img => {
      Swal.fire('Guardado', 'Imagen de Usuario Actualizada', 'success').then(() => {
        this.modalImageService.newImage.emit(img);
      })
      this.closeModal()
    })
    .catch( () => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error')
    })

  }

}
