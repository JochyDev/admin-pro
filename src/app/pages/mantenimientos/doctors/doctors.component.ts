import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public imgSubs!: Subscription;


  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService
  ) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubs = this.modalImageService.newImage.subscribe(() => {
      this.loadDoctors();
    })
  }

  loadDoctors(){
    this.doctorService.loadDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.doctorsTemp = doctors;
      this.loading = false;
    })
  }


  search(term: string){
    if( term.length == 0){ 
      this.doctors = this.doctorsTemp;
      return
    }

    this.loading = true;
    this.searchsService.search( 'doctor', term)
    .subscribe((result: Doctor[]): void => {
      this.doctors = result;
      this.loading = false;
    })
  }

  openModal(doctor: Doctor){

    if( !doctor._id ){ return };
      this.modalImageService.openModal('doctors', doctor._id, doctor.img);
    
  }

  deleteDoctor( doctor: Doctor ){
    Swal.fire({
      title: 'Borrar Doctor?',
      text: `Esta a punto de borrar a ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed && doctor._id) {
        this.doctorService.deleteDoctor(doctor._id).subscribe(() => {
          Swal.fire('Usuario borrado', `${doctor.name} fue elminado correctamente`, 'success')
          this.loadDoctors()
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}




 