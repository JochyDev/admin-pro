import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

  logout(){
    this.userService.logout()
  }

}
