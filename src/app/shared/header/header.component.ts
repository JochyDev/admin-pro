import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user!: User;

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.user;
   }

  ngOnInit(): void {
    customInitFunctions();
  }

  logout(){
    this.userService.logout()
  }

}
