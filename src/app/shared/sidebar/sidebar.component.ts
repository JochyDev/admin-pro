import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(
    private sideBarService: SidebarService,
    private userService: UserService
  ) { 
    this.menuItems = sideBarService.menu;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
  }

}
