import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
  }

  search(term: string){

    if(term.length === 0){
      return;
    }

    this.router.navigateByUrl(`/dashboard/search/${term}`)
  }

  logout(){
    this.userService.logout()
  }

}
