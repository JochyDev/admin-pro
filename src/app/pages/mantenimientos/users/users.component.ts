import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public desde: number = 0;
  public loading: boolean = false;
  public param: FormControl = new FormControl('');
  public role: FormControl = new FormControl('');
  
  public imgSubs!: Subscription

  constructor(
    private userService: UserService,
    private searchsService: SearchsService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage.subscribe(() => {
      this.loadUsers();
    })
  }

  paginate(value: number){

    this.desde += value;

    if(this.desde < 0){
      this.desde = 0
      return;
    } else if ( this.desde >= this.totalUsers){
      this.desde -= value;
      return;
    }

    this.loadUsers()
    
  }

  changeRole(user: User){
    user.role = this.role.value;
    this.userService.updateUserRole(user).subscribe((result) => {
      console.log(result)
    })
  }

  loadUsers(){
    this.loading = true;
    this.userService.loadUsers(this.desde).subscribe( ({total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    })
  }

  search(){

    if( this.param.value.length == 0){ 
      this.users = this.usersTemp;
      return
    }

    this.loading = true;
    this.searchsService.search( 'user', this.param.value)
    .subscribe((result:  any[]) => {
      this.users = result;
      this.loading = false;
    })
  }

  deleteUser(user: User){

    if(user.uid === this.userService.user.uid){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return; 
    }

    Swal.fire({
      title: 'Borrar Usuario?',
      text: `Esta a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid).subscribe(() => {
          this.loadUsers();
          Swal.fire('Usuario borrado', `${user.name} fue elminado correctamente`, 'success')
        })
      }
    })

    
  }

  openModal(user: User){
    this.modalImageService.openModal('users', user.uid, user.img);
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

}
