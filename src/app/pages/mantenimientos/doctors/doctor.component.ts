import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected!: Hospital;
  public doctorSelected!: Doctor;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })
    this.loadHospitals();
    this.route.params.subscribe(({id}) => this.getDoctor(id))

    this.listenHospitalSelection();
   
  }

  loadHospitals(){
    this.hospitalService.loadHospitals()
      .subscribe((hospitals) => {
        this.hospitals = hospitals;
      })
  }

  getDoctor(id: string){

    if(id === 'new'){return;}

    this.doctorService.getDoctorById(id)
      .subscribe({
        next: (doctor: Doctor) => {
          const { name, hospital } = doctor;
          this.doctorSelected = doctor;
          this.doctorForm.setValue({name, hospital})
        },
        error: () => this.router.navigateByUrl(`/dashboard/doctors`)
      })
    
  }

  listenHospitalSelection(){
    this.doctorForm.get('hospital')?.valueChanges
      .subscribe( id => {
          const hospital = this.hospitals.find( hospital => hospital._id == id);
          if(hospital){
            this.hospitalSelected = hospital;
          }
      })
  }

  saveDoctor(){
    const { name } = this.doctorForm.value;
    if(this.doctorSelected){

      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }

      this.doctorService.updateDoctor(data)
        .subscribe(() => {
          Swal.fire('Doctor', `Doctor ${name} editado exitosamente`, 'success');
        })
    } else { 
      this.doctorService.createDoctor(this.doctorForm.value)
      .subscribe({
        next: (doctor: Doctor) => {
          Swal.fire('Doctor', `Doctor ${name} creado exitosamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${doctor._id}`)
        },
        error: () => Swal.fire('Error', 'Error creando médico', 'error' )
      })
    }
  }

}
