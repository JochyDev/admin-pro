import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  hospitals: Hospital[] = [];
  usuarios : User[] = [];
  doctors: Doctor[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchsService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(({term}) => {
        this.search(term)
      })
  }

  search(term: string){
    this.searchService.searchAll(term)
      .subscribe(({usuarios, doctors, hospitals}) => {
        this.usuarios = usuarios;
        this.doctors = doctors;
        this.hospitals = hospitals;
      })
  }

}
