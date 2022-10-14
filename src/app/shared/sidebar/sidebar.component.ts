import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  user!: User;

  constructor(
    public sideBarService: SidebarService,
    private userService: UserService
  ) { 
    this.user = this.userService.user;
  }

  
  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

}
