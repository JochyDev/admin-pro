import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {

    this.getUsuarios().then( users => {
      console.log(users)
    })

    // const promesa = new  Promise( ( resolve, reject) => {
    //  if(false){
    //   resolve('Hola Mundo');
    //  }else{
    //   reject('Algo salió mal')
    //  }
    // })

    // promesa.then( (mensaje)=> {
    //   console.log(mensaje)
    // }).catch((mensaje) => {
    //   console.log(mensaje)
    // })

    // console.log('Fin del init')

   
  }

  getUsuarios(){

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then( (body: any) => resolve(body.data));
    })

  }
}
