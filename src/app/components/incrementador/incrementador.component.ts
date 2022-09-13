import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
  
  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() onChangeProgress: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  cambiarValor(valor: number){

    this.progreso = this.progreso + valor;

    if(this.progreso < 0){
      this.progreso = 0; 
    }

    if(this.progreso > 100){
      this.progreso = 100;
    }

    this.onChangeProgress.emit(this.progreso)
    
  }

  onChange(nuevoValor: number){
    if(nuevoValor >= 100){
      this.progreso = 100
    } else if (nuevoValor <= 0){
      this.progreso = 0
    } else {
      this.progreso = nuevoValor
    }

    this.onChangeProgress.emit(this.progreso);
  }



}
