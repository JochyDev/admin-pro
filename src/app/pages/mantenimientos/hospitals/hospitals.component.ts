import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs!: Subscription;
  public term: string = '';

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImageService.newImage.subscribe(() => {
      this.loadHospitals();
    })
  }

  loadHospitals(){ 
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
      this.loading = false;
    })
  }

  saveChanges( hospital: Hospital ){
    if(!hospital._id){ return; }
    this.hospitalService.updateHospital(hospital._id, hospital.name)
    .subscribe( () => {
      Swal.fire('Actualizado', hospital.name, 'success')
    })
  }

  deleteHospital( hospital: Hospital ){
    if(!hospital._id){ return; }
    this.hospitalService.deleteHospital( hospital._id )
      .subscribe( () => {
        Swal.fire('Eliminado', hospital.name, 'success')
        this.loadHospitals()
    })
  }
  async openSweetAlert(){
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
    if (value?.trim().length) {
      this.hospitalService.createHospital(value)
        .subscribe((hospital) => {
          Swal.fire('Creado', hospital.name, 'success');
          this.hospitals.push(hospital)
        })
    }
  }

  openModal( hospital: Hospital ){
   if(!hospital._id){ return; }
   this.modalImageService.openModal('hospitals', hospital._id, hospital.img );
  }

  search(){
    if( this.term.length == 0){ 
      this.hospitals = this.hospitalsTemp;
      return
    }

    this.loading = true;
    this.searchsService.search('hospital', this.term)
    .subscribe((hospitals: Hospital[]): void => {
      this.hospitals = hospitals;
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


 
}
